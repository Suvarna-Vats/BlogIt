import React from "react";

import { Check, Down } from "@bigbinary/neeto-icons";
import { Button, Dropdown as NeetoDropdown } from "@bigbinary/neetoui";
import classNames from "classnames";
import withT from "src/commons/withT";
import { actionLabel } from "src/components/utis";

const PostFormDropdown = ({
  value,
  onChange,
  onSubmit,
  isSubmitDisabled,
  isMenuDisabled,
  isSubmitting,
  className = "",
  t,
}) => (
  <div className={classNames("inline-flex items-stretch", className)}>
    <Button
      className="h-full rounded-r-none bg-black"
      disabled={isSubmitDisabled}
      size="medium"
      style="primary"
      type="button"
      label={classNames(
        isSubmitting && t("postForm.submit.submitting"),
        !isSubmitting && actionLabel(value, t)
      )}
      onClick={() => onSubmit?.(value)}
    />
    <NeetoDropdown
      disabled={isMenuDisabled}
      strategy="fixed"
      customTarget={
        <button
          aria-label={t("postForm.actions.changeSaveActionAria")}
          className="grid h-full w-10 place-items-center rounded-l-none rounded-r-md bg-black text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isMenuDisabled}
          type="button"
        >
          <Down size={18} />
        </button>
      }
    >
      <NeetoDropdown.Menu>
        <NeetoDropdown.MenuItem.Button onClick={() => onChange("published")}>
          <div className="flex w-full items-center justify-between gap-4">
            <span>{t("postForm.submit.publish")}</span>
            {value === "published" && <Check size={16} />}
          </div>
        </NeetoDropdown.MenuItem.Button>
        <NeetoDropdown.MenuItem.Button onClick={() => onChange("draft")}>
          <div className="flex w-full items-center justify-between gap-4">
            <span>{t("postForm.submit.saveAsDraft")}</span>
            {value === "draft" && <Check size={16} />}
          </div>
        </NeetoDropdown.MenuItem.Button>
      </NeetoDropdown.Menu>
    </NeetoDropdown>
  </div>
);

export default withT(PostFormDropdown);
