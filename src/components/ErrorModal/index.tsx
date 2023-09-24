import "./index.scss";
import { SadSmiley } from "../../assets";

interface IErrorModal {
  text: string;
  closeModal: Function;
}
export const ErrorModal = ({ text, closeModal }: IErrorModal) => {
  return (
    <div className="bg-wall">
      <div className="error-modal">
        <div>
          <span>{text}</span>
          <img alt="" src={SadSmiley} />
        </div>
        <div className="close-modal" onClick={() => closeModal()}>
          X
        </div>
      </div>
    </div>
  );
};
