type Props = {
  text: string;
};

export const Loader = ({ text }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">{text}...</p>
      </div>
    </div>
  );
};
