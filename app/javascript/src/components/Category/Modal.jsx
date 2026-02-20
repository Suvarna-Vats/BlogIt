import React, { useEffect, useMemo, useState } from "react";

import { Button, Input, Modal } from "@bigbinary/neetoui";
import classNames from "classnames";
import { isEmpty, pipe, trim } from "ramda";
import { useTranslation } from "react-i18next";

const CreateCategoryModal = ({ isOpen, isSubmitting, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!isOpen) setName("");
  }, [isOpen]);

  const canSubmit = useMemo(() => {
    const normalized = pipe(trim)(name);

    return !isEmpty(normalized) && !isSubmitting;
  }, [isSubmitting, name]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!canSubmit) return;

    await onSubmit?.(pipe(trim)(name));
  };

  return (
    <Modal isOpen={isOpen} size="small" onClose={onClose}>
      <Modal.Header title={t("categories.modal.title")} />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <Input
            required
            label={t("categories.modal.fieldLabel")}
            placeholder={t("categories.modal.placeholder")}
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="cursor-pointer bg-black"
            disabled={!canSubmit}
            loading={isSubmitting}
            size="small"
            type="submit"
            label={classNames({
              [t("categories.modal.adding")]: isSubmitting,
              [t("categories.modal.add")]: !isSubmitting,
            })}
          />
          <Button
            label={t("categories.modal.cancel")}
            size="small"
            style="secondary"
            type="button"
            onClick={onClose}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateCategoryModal;
