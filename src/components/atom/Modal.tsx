import { useModal } from "@/contexts/modal.context";
import Backdrop from "./Backdrop";

interface ModalProps {
  title: string;
}

function Modal({ title }: ModalProps) {
  const modal = useModal();

  return (
    <Backdrop>
      <article className="modal">
        <h1 className="font-semibol">{title}</h1>
        <button
          className="text-[#5F0080] font-bold"
          onClick={() => modal.close()}
        >
          확인
        </button>
      </article>
    </Backdrop>
  );
}

export default Modal;
