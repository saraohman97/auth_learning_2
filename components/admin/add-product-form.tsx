"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/input";
import TextArea from "../inputs/text-area";
import Checkbox from "../inputs/checkbox";
import { categories } from "@/utils/categories";
import CategoryInput from "../inputs/category-input";
import { colors } from "@/utils/colors";
import SelectColor from "../inputs/select-color";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/lib/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product data: ", data);

    // upload images to fb
    // save product to mongodb
    setIsLoading(true);
    let uploadedImages: UploadImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("No selected image!");
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }

    const handleImageUploads = async () => {
      toast("Creating product, please wait....");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  console.log("Error uploading image, ", error);
                  reject(error);
                },
                () => {
                  // Handle successful uploads on complete
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the downloaded URL, ", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads, ", error);
        return toast.error("Error handling image uploads.");
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };

    axios.post('/api/product', productData).then(() => {
      toast.success("Product created.")
      setIsProductCreated(true)
      router.refresh();
    }).catch((error) => {
      toast.error('Something went wrong trying to save product to db.')
    }).finally(() => {
      setIsLoading(false)
    })
  };

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  return (
    <div className="max-w-96 mx-auto mt-10 space-y-4">
      <h2 className="text-2xl text-center font-semibold">Add a product</h2>

      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Checkbox
        id="inStock"
        label="This product is in stock"
        register={register}
      />

      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a category</div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full flexflex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the available product colors and upload their images.
          </div>
          <div>
            You must upload an image for each of the color selected otherwise
            your color selection will be ignored.
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={false}
              />
            );
          })}
        </div>
      </div>
      <Button onClick={handleSubmit(onSubmit)}>
        {isLoading ? "Laoding..." : "Add product"}
      </Button>
    </div>
  );
};

export default AddProductForm;
