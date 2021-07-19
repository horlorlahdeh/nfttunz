import "../../assets/styles/modal.css";
import keyChainLogoMini from '../../assets/images/keychain_logo_mini.png'

const LoginModal = ({
  handleClose,
  show,
  children,
  username,
  setUsernameField,
  loginUser,
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div
      className={`${showHideClassName} modal`}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      {(
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header modal-header-bg">
              {/* <h5 className="modal-title" id="exampleModalLabel">
                Log In Hive Keychain
              </h5> */}
              <img alt="keychain-icon" src={keyChainLogoMini} />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="username"
                    value={username}
                    onChange={setUsernameField}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                onClick={loginUser}
                type="button"
                className="btn btn-primary btnGeneral"
              >
                Login User
              </button>
              
            </div>
          </div>
        </div>
      ) || { children }}
    </div>
  );
};

export default LoginModal;
