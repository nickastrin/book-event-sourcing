import "./FilterLabel.css";

interface FilterLabelProps {
  icon?: string;
  label: string;
}

export const FilterLabel = ({ icon, label }: FilterLabelProps) => {
  return (
    <div className="flex items-center gap-2 filter-label">
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      <span>{label}</span>
      <span className="material-symbols-outlined">expand_more</span>
    </div>
  );
};
