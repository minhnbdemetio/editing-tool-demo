import { FC } from 'react';
import { RecommendedKeywordsProps } from './searchInput';

export const RecommendedComplete: FC<RecommendedKeywordsProps> = ({
  onValueChange,
  recommendedKeywords,
}) => {
  if (!recommendedKeywords?.length) return <></>;
  return (
    <div className="w-full h-fit bg-white absolute right-0 top-12 rounded-md shadow-lg justify-between z-10 p-2 flex flex-col">
      <div className="block">
        {recommendedKeywords?.map(keyword => (
          <div
            className="w-full flex flex-col px-4 py-2 cursor-pointer hover:bg-slate-100 rounded-md"
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
