export default function FeedbackBanner({ feedback, onClose }) {
  if (!feedback) {
    return null;
  }

  return (
    <section className={`feedback-banner ${feedback.type}`}>
      <div>
        <strong>{feedback.type === "error" ? "Error" : "Estado"}</strong>
        <p>{feedback.message}</p>
      </div>
      <button className="ghost-button compact-button" type="button" onClick={onClose}>
        Cerrar
      </button>
    </section>
  );
}
