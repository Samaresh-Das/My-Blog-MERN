import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { linkSite } from "../linkSite";
import { motion } from "framer-motion";

const Modal = (props) => {
  const history = useHistory();
  const { logout, token } = useContext(AuthContext);

  const deactivateHandler = async () => {
    const response = await fetch(`${linkSite}/api/user/delete`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    console.log(data);
    history.push("/");
    logout();
  };

  const modalContent = (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neoBorder/60 transition-opacity"
        onClick={props.onClose}
      />

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white border-4 border-neoBorder rounded-xl shadow-neoLg w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-neoPink border-2 border-neoBorder shadow-neo">
                <svg
                  className="h-6 w-6 text-neoBorder"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-black text-neoBorder"
                id="modal-title"
              >
                Deactivate account
              </h3>
            </div>

            <p className="text-neoBorder font-medium text-[16px] mb-8 border-l-4 border-neoBorder pl-4">
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg border-2 border-neoBorder bg-white text-neoBorder font-bold shadow-neo hover:shadow-neoHover hover:-translate-y-1 transition-all focus:outline-none"
                onClick={props.onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg border-2 border-neoBorder bg-neoPink text-neoBorder font-bold shadow-neo hover:shadow-neoHover hover:-translate-y-1 transition-all focus:outline-none"
                onClick={deactivateHandler}
              >
                Deactivate
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById("modal"));
};

export default Modal;


