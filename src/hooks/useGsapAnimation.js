import { useEffect } from "react";

/**
 * Executa animações GSAP dentro de um ref de container.
 * Reverte o contexto automaticamente no cleanup.
 *
 * @param {React.RefObject} ref - ref do elemento container
 * @param {(gsap: object) => void} setup - função que recebe o gsap e registra as animações
 * @param {Array} deps - dependências extras do useEffect (além do ref)
 */
export const useGsapAnimation = (ref, setup, deps = []) => {
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !ref.current) return;

    const ctx = gsap.context(() => setup(gsap), ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
