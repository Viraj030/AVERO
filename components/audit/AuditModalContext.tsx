'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuditModal } from './AuditModal';

interface AuditModalContextType {
  openAudit: () => void;
  openAuditWithSpend: (spend?: string) => void;
  closeAudit: () => void;
  isAuditOpen: boolean;
  prefillSpend?: string;
}

const AuditModalContext = createContext<AuditModalContextType>({
  openAudit: () => {},
  openAuditWithSpend: () => {},
  closeAudit: () => {},
  isAuditOpen: false,
  prefillSpend: undefined,
});

export function AuditModalProvider({ children }: { children: React.ReactNode }) {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [prefillSpend, setPrefillSpend] = useState<string | undefined>();

  const openAudit = useCallback(() => {
    setPrefillSpend(undefined);
    setIsAuditOpen(true);
  }, []);

  const openAuditWithSpend = useCallback((spend?: string) => {
    setPrefillSpend(spend);
    setIsAuditOpen(true);
  }, []);

  const closeAudit = useCallback(() => {
    setIsAuditOpen(false);
  }, []);

  return (
    <AuditModalContext.Provider
      value={{
        openAudit,
        openAuditWithSpend,
        closeAudit,
        isAuditOpen,
        prefillSpend,
      }}
    >
      {children}
      <AuditModal
        open={isAuditOpen}
        onClose={closeAudit}
        prefillSpend={prefillSpend}
      />
    </AuditModalContext.Provider>
  );
}

export function useAuditModal() {
  return useContext(AuditModalContext);
}
