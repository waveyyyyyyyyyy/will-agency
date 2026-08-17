export interface ClientRegistration {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  privacyConsentAt: string; // ISO timestamp — when the GDPR/privacy checkbox was accepted
  medicalConsentAt: string; // ISO timestamp — when the "not a medical device" checkbox was accepted
  registeredAt: string; // ISO timestamp — when the record was created
}

const REG_KEY = "supernova-client-registration-v1";

export function hasRegistered(): boolean {
  try {
    return !!window.localStorage.getItem(REG_KEY);
  } catch {
    return false;
  }
}

export function getStoredRegistration(): ClientRegistration | null {
  try {
    const raw = window.localStorage.getItem(REG_KEY);
    return raw ? (JSON.parse(raw) as ClientRegistration) : null;
  } catch {
    return null;
  }
}

/**
 * PROVISIONAL storage only. This project has no backend/database yet — see
 * the chat note on connecting Supabase. Deliberately never touches the
 * password: the form collects it (so the flow matches what real signup
 * will need) but it only ever lives in component state long enough to
 * submit, then gets discarded — there's nowhere legitimate to send or
 * store it client-side. Once a real backend is wired, this is the one
 * place to swap for a real signup API call; nothing else in the UI needs
 * to change.
 */
export function saveClientRegistrationLocal(data: Omit<ClientRegistration, "registeredAt">): ClientRegistration {
  const record: ClientRegistration = { ...data, registeredAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(REG_KEY, JSON.stringify(record));
  } catch {
    /* private browsing / storage disabled — the form still "succeeds" for this session */
  }
  return record;
}
