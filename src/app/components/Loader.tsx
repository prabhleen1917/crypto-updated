interface LoaderProps {
    page: string;
  }
  
  export default function Loader({ page }: LoaderProps) {
    return (
      <div>
        <h1 className="font-bold text-indigo-50/70 uppercase tracking-wide">
          Loading {page} ...
        </h1>
      </div>
    );
  }
  