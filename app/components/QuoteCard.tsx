interface QuoteCardProps {
  quote: string;
  author: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author }) => {
  return (
    <div className=" shadow-lg rounded-lg border border-white ">
      <div className="px-6 py-4">
        <p className={`text-lg font-semibold mb-2 `}>" {quote} "</p>
        <p className="text-sm text-right text-gray-400">{author}</p>
      </div>
    </div>
  );
};

export default QuoteCard;
