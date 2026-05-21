import { useRef, useState } from "react";
import { useGsapAnimation } from "../../hooks/useGsapAnimation";
import { T } from "../../tokens/theme";
import { Star } from "../ui/Star";
import { SectionHeading } from "../ui/SectionHeading";

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

const INITIAL_FORM = {
  nome: "", email: "", whatsapp: "", nascimento: "",
  cidade: "", estado: "", profissao: "", motivacao: "",
};

const validate = (form) => {
  const errs = {};
  if (!form.nome.trim()) errs.nome = "Informe seu nome completo";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "E-mail inválido";
  if (form.whatsapp.replace(/\D/g, "").length < 10) errs.whatsapp = "WhatsApp inválido";
  if (!form.nascimento) errs.nascimento = "Informe sua data de nascimento";
  if (!form.cidade.trim()) errs.cidade = "Informe sua cidade";
  if (!form.estado) errs.estado = "Selecione seu estado";
  if (!form.profissao.trim()) errs.profissao = "Informe sua profissão";
  if (form.motivacao.trim().length < 20) errs.motivacao = "Conte um pouco mais (mínimo 20 caracteres)";
  return errs;
};

const inputBaseStyle = (hasError) => ({
  fontFamily: T.fontBody,
  fontSize: "1rem",
  color: T.gray900,
  background: T.white,
  border: `2px solid ${hasError ? "#E53E3E" : "rgba(204,27,27,0.12)"}`,
  borderRadius: "10px",
  padding: "14px 18px",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  transition: T.transition,
});

const labelStyle = {
  fontFamily: T.fontBody,
  fontSize: "0.85rem",
  fontWeight: 600,
  color: T.gray900,
  marginBottom: "6px",
  display: "block",
  letterSpacing: "0.3px",
};

const errorStyle = {
  fontFamily: T.fontBody,
  fontSize: "0.78rem",
  color: "#E53E3E",
  marginTop: "4px",
  display: "block",
};

const focusHandlers = (errors, field) => ({
  onFocus: (e) => {
    e.target.style.borderColor = T.red;
    e.target.style.boxShadow = "0 0 0 3px rgba(204,27,27,0.08)";
  },
  onBlur: (e) => {
    e.target.style.borderColor = errors[field] ? "#E53E3E" : "rgba(204,27,27,0.12)";
    e.target.style.boxShadow = "none";
  },
});

export const FormSection = ({ onSubmitSuccess, formRef }) => {
  const sectionRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useGsapAnimation(sectionRef, (gsap) => {
    gsap.from(".form-heading", {
      scrollTrigger: { trigger: ".form-heading", start: "top 85%" },
      y: 50, opacity: 0, duration: 1,
    });
    gsap.from(".form-field", {
      scrollTrigger: { trigger: ".form-container", start: "top 80%" },
      y: 30, opacity: 0, duration: 0.5, stagger: 0.08,
    });
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = () => {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess(form);
    }, 2000);
  };

  return (
    <section
      ref={(el) => { sectionRef.current = el; if (formRef) formRef.current = el; }}
      style={{
        background: T.cream,
        padding: "100px 20px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div className="form-heading">
          <SectionHeading
            eyebrow="Formulário de Interesse"
            eyebrowIcon="star"
            title={`Comece sua <span style="color:${T.red}">trilha</span>`}
            subtitle="Preencha seus dados abaixo. Nossa equipe analisará seu interesse e entrará em contato."
          />
        </div>

        <div className="form-container" style={{
          background: T.white,
          borderRadius: T.radiusLg,
          padding: "clamp(28px, 5vw, 48px)",
          boxShadow: T.shadow,
          border: "1px solid rgba(204,27,27,0.06)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            <div className="form-field">
              <label style={labelStyle}>Nome Completo *</label>
              <input
                style={inputBaseStyle(errors.nome)}
                value={form.nome}
                onChange={e => handleChange("nome", e.target.value)}
                placeholder="Seu nome completo"
                {...focusHandlers(errors, "nome")}
              />
              {errors.nome && <span style={errorStyle}>{errors.nome}</span>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-field">
                <label style={labelStyle}>E-mail *</label>
                <input
                  type="email"
                  style={inputBaseStyle(errors.email)}
                  value={form.email}
                  onChange={e => handleChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  {...focusHandlers(errors, "email")}
                />
                {errors.email && <span style={errorStyle}>{errors.email}</span>}
              </div>
              <div className="form-field">
                <label style={labelStyle}>WhatsApp *</label>
                <input
                  style={inputBaseStyle(errors.whatsapp)}
                  value={form.whatsapp}
                  onChange={e => handleChange("whatsapp", e.target.value)}
                  placeholder="(00) 00000-0000"
                  {...focusHandlers(errors, "whatsapp")}
                />
                {errors.whatsapp && <span style={errorStyle}>{errors.whatsapp}</span>}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-field">
                <label style={labelStyle}>Data de Nascimento *</label>
                <input
                  type="date"
                  style={inputBaseStyle(errors.nascimento)}
                  value={form.nascimento}
                  onChange={e => handleChange("nascimento", e.target.value)}
                  {...focusHandlers(errors, "nascimento")}
                />
                {errors.nascimento && <span style={errorStyle}>{errors.nascimento}</span>}
              </div>
              <div className="form-field">
                <label style={labelStyle}>Profissão *</label>
                <input
                  style={inputBaseStyle(errors.profissao)}
                  value={form.profissao}
                  onChange={e => handleChange("profissao", e.target.value)}
                  placeholder="Sua profissão"
                  {...focusHandlers(errors, "profissao")}
                />
                {errors.profissao && <span style={errorStyle}>{errors.profissao}</span>}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
              <div className="form-field">
                <label style={labelStyle}>Cidade *</label>
                <input
                  style={inputBaseStyle(errors.cidade)}
                  value={form.cidade}
                  onChange={e => handleChange("cidade", e.target.value)}
                  placeholder="Sua cidade"
                  {...focusHandlers(errors, "cidade")}
                />
                {errors.cidade && <span style={errorStyle}>{errors.cidade}</span>}
              </div>
              <div className="form-field">
                <label style={labelStyle}>Estado *</label>
                <select
                  style={{ ...inputBaseStyle(errors.estado), cursor: "pointer", appearance: "auto" }}
                  value={form.estado}
                  onChange={e => handleChange("estado", e.target.value)}
                  {...focusHandlers(errors, "estado")}
                >
                  <option value="">UF</option>
                  {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
                {errors.estado && <span style={errorStyle}>{errors.estado}</span>}
              </div>
            </div>

            <div className="form-field">
              <label style={labelStyle}>Por que você deseja construir o partido com a gente? *</label>
              <textarea
                style={{ ...inputBaseStyle(errors.motivacao), minHeight: "120px", resize: "vertical", lineHeight: 1.6 }}
                value={form.motivacao}
                onChange={e => handleChange("motivacao", e.target.value)}
                placeholder="Compartilhe suas motivações, experiências e o que te inspira a fazer parte dessa luta..."
                {...focusHandlers(errors, "motivacao")}
              />
              {errors.motivacao && <span style={errorStyle}>{errors.motivacao}</span>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                fontFamily: T.fontBody,
                fontSize: "1.05rem",
                fontWeight: 700,
                color: T.white,
                background: loading
                  ? T.gray300
                  : `linear-gradient(135deg, ${T.red} 0%, ${T.redDark} 100%)`,
                border: "none",
                borderRadius: "12px",
                padding: "18px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: T.transition,
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 28px rgba(204,27,27,0.35)";
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {loading ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" style={{ animation: "trilha-spin 1s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" fill="none" strokeDasharray="30 70" strokeLinecap="round" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar meu interesse
                  <span style={{ fontSize: "1.2rem" }}>→</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trilha-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 600px) {
          .form-container div[style*="grid-template-columns: 1fr 1fr"],
          .form-container div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
