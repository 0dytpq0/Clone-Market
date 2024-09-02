import { useModal } from "@/contexts/modal.context";
import Backdrop from "./Backdrop";
import Button from "./Button";

interface ModalProps {
  title: string;
}

function Modal({ title }: ModalProps) {
  const modal = useModal();

  return (
    <Backdrop>
      <article className="modal">
        <h1 className="font-semibold">{title}</h1>
        <Button
          size={"sm"}
          variant={"outline"}
          intent="primary"
          onClick={modal.close}
        >
          확인
        </Button>
      </article>
    </Backdrop>
  );
}

export default Modal;
