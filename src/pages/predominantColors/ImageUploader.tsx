type Props = {
  onUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ImageUploader({ onUploadImage }: Props) {
  return (
    <>
      <label
        htmlFor="image"
        className="bg-stone-800 w-full p-6 rounded-xl border border-dashed border-stone-600 text-stone-600 hover:text-stone-300 hover:border-stone-300 duration-150 transition hover:-translate-y-1 cursor-pointer text-center"
      >
        Upload your image
      </label>
      <input
        onChange={onUploadImage}
        id="image"
        accept="image/*"
        type="file"
        hidden
      />
    </>
  );
}
