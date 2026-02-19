import React from "react";

import { Button, Dropdown as NeetoDropdown } from "@bigbinary/neetoui";
import { actionLabel } from "src/components/utis";

const PostFormDropdown = ({
  value,
  onChange,
  onSubmit,
  isSubmitDisabled,
  isMenuDisabled,
  isSubmitting,
  className = "",
}) => (
  <div className={`inline-flex items-stretch ${className}`}>
    <Button
      className="h-full rounded-r-none bg-black"
      disabled={isSubmitDisabled}
      label={isSubmitting ? "Submitting..." : actionLabel(value)}
      size="medium"
      style="primary"
      type="button"
      onClick={() => onSubmit?.(value)}
    />
    <NeetoDropdown
      disabled={isMenuDisabled}
      strategy="fixed"
      customTarget={
        <button
          aria-label="Change save action"
          className="grid h-full w-10 place-items-center rounded-l-none rounded-r-md bg-black text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isMenuDisabled}
          type="button"
        >
          <i className="ri-arrow-down-s-line text-lg" />
        </button>
      }
    >
      <NeetoDropdown.Menu>
        <NeetoDropdown.MenuItem.Button onClick={() => onChange("published")}>
          <div className="flex w-full items-center justify-between gap-4">
            <span>Publish</span>
            {value === "published" && <i className="ri-check-line text-base" />}
          </div>
        </NeetoDropdown.MenuItem.Button>
        <NeetoDropdown.MenuItem.Button onClick={() => onChange("draft")}>
          <div className="flex w-full items-center justify-between gap-4">
            <span>Save as draft</span>
            {value === "draft" && <i className="ri-check-line text-base" />}
          </div>
        </NeetoDropdown.MenuItem.Button>
      </NeetoDropdown.Menu>
    </NeetoDropdown>
  </div>
);

export default PostFormDropdown;
