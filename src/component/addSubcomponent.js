import React from "react";
import { Button2 } from "../styling";

import { Stepper, QtyDisplay } from "../styling";

const QuantityButtons = ({
  onAdd,
  onSub,
  disableAdd = false,
  disableSub = false,
  quantity,
  showQuantity = false,
}) => (
  <Stepper>
    <Button2
      onClick={onSub}
      disabled={disableSub}
      aria-label="Decrease quantity"
    >
      −
    </Button2>
    {showQuantity && <QtyDisplay>{quantity}</QtyDisplay>}
    <Button2
      onClick={onAdd}
      disabled={disableAdd}
      aria-label="Increase quantity"
    >
      +
    </Button2>
  </Stepper>
);

export default QuantityButtons;
