import { FC } from 'react';
import { RecommendedKeywordsProps } from './searchInput';

export const RecommendedKeywords: FC<RecommendedKeywordsProps> = ({
  onValueChange,
  recommendedKeywords,
}) => {
  if (!recommendedKeywords?.length) return <></>;
  return (
    <div className="w-full h-fit bg-white absolute right-0 top-12 rounded-md shadow-lg justify-between z-10 p-4 flex flex-col">
      <span className="text-[#70798f] text-md">Recommended keywords</span>
      <div className="block">
        {recommendedKeywords?.map(keyword => (
          <div
            className="m-0.5 px-6 py-1 justify-between inline-block items-center rounded-full bg-gray-200 cursor-pointer text-md"
            key={keyword}
            onClick={() => {
              onValueChange(keyword);
            }}
          >
            {keyword}
          </div>
        ))}
      </div>
    </div>
  );
};
