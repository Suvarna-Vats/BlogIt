import React from "react";

import { Tag } from "@bigbinary/neetoui";

const FilterTags = ({
  categories = [],
  status,
  onRemoveCategory,
  onRemoveStatus,
}) => {
  if (!categories.length && !status) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map(category => (
        <Tag
          key={category.value ?? category.label}
          label={category.label}
          size="small"
          style="secondary"
          type="outline"
          onClose={() => onRemoveCategory?.(category)}
        />
      ))}
      {status && (
        <Tag
          key={status.value ?? status.label}
          label={status.label}
          size="small"
          style="secondary"
          type="outline"
          onClose={() => onRemoveStatus?.()}
        />
      )}
    </div>
  );
};

export default FilterTags;
