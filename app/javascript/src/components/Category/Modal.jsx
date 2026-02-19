import React, { useEffect, useMemo, useState } from "react";

import { Button, Input, Modal } from "@bigbinary/neetoui";
import { isEmpty, pipe, trim } from "ramda";

const CreateCategoryModal = ({ isOpen, isSubmitting, onClose, onSubmit }) => {
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
      <Modal.Header title="New category" />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <Input
            required
            label="Category title"
            placeholder="Enter category title"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="cursor-pointer bg-black"
            disabled={!canSubmit}
            label={isSubmitting ? "Adding..." : "Add"}
            loading={isSubmitting}
            size="small"
            type="submit"
          />
          <Button
            label="Cancel"
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
