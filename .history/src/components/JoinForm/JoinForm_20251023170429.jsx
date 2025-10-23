"use client";
import styles from "./JoinForm.module.css";
import { useState } from "react";

const ROLES = [
  "Nail Technician",
  "Wax Specialist",
  "Lash Tech",
  "Massage & Body Work",
  "Manager",
  "Makeup Artist",
  "Esthetician",
  "Barista",
  "Front Desk",
];

export default function JoinForm({ location = "Beauty Lab" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: ROLES[0],
    note: "",
  });
  const [status, setStatus] = useState({ sending: false, ok: null, error: null });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: null, error: null });
    const message = `Join Request\nLocation: ${location}\nPosition: ${form.position}\nPhone: ${form.phone}\n\nNote:\n${form.note}`;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus({ sending: false, ok: true, error: null });
        setForm({ name: "", email: "", phone: "", position: ROLES[0], note: "" });
      } else {
        throw new Error(json.error || "Failed to send");
      }
    } catch (err) {
      setStatus({ sending: false, ok: false, error: err.message });
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.row2}>
          <label>
            Name*
            <input required name="name" value={form.name} onChange={onChange} />
          </label>
          <label>
            Email*
            <input required type="email" name="email" value={form.email} onChange={onChange} />
          </label>
        </div>
        <div className={styles.row2}>
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={onChange} />
          </label>
          <label>
            Position Applying For*
            <select name="position" value={form.position} onChange={onChange}>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Short note
          <textarea rows={6} name="note" value={form.note} onChange={onChange} />
        </label>
        <div className={styles.actions}>
          <button className={styles.btn} type="submit" disabled={status.sending}>
            {status.sending ? "Sending…" : "Submit"}
          </button>
          {status.ok && <p className={styles.ok}>Thanks! We’ll get back to you.</p>}
          {status.ok === false && <p className={styles.err}>{status.error || "Something went wrong"}</p>}
        </div>
      </form>
    </div>
  );
}
