import ReactDom from 'react-dom'

export default function ModalPortal({ children }) {
  const el = document.getElementById('modal-root')
  return ReactDom.createPortal(children, el)
}
