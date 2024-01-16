const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        min-h-fit
        h-full
        flex
        items-center
        justify-center
        pb-12
        pt-14
        "
    >
      <div
        className="
            max-w-[750px]
            w-full
            flex
            flex-col
            gap-6
            items-center
            border
            shadow-md
            shadow-black/5
            rounded-md
            p-4
            md:p-8
            "
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
