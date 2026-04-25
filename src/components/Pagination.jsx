import Button from "./Button";

export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
