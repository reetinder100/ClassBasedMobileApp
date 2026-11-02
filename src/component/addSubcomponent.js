import React from "react";
import { Button2 } from "../styling";

const QuantityButtons = ({
  onAdd,
  onSub,
  disabled = false,
  quantity,
  showQuantity = false,
}) => (
  <>
    <Button2 onClick={onSub} disabled={disabled}>
      -
    </Button2>
    {showQuantity && <span>{quantity}</span>}
    <Button2 onClick={onAdd} disabled={disabled}>
      +
    </Button2>
  </>
);

export default QuantityButtons;
