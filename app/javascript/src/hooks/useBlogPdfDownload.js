import { useCallback, useEffect, useRef, useState } from "react";

import { Toastr } from "@bigbinary/neetoui";
import { subscribeToBlogDownloadChannel } from "channels/blogDownloadChannel";
import createConsumer from "channels/consumer";
import { useTranslation } from "react-i18next";
import { createPostPdfExport, downloadPostPdfExport } from "src/apis/posts";

const clampPercentage = value => Math.min(100, Math.max(0, Number(value) || 0));

const useBlogPdfDownload = ({ slug, isPreview = false } = {}) => {
  const { t } = useTranslation();

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadToken, setDownloadToken] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadMessage, setDownloadMessage] = useState("");
  const [isStartingDownload, setIsStartingDownload] = useState(false);

  const subscriptionRef = useRef(null);
  const consumerRef = useRef(null);
  const downloadTriggeredRef = useRef(false);

  const resetDownloadState = useCallback(() => {
    subscriptionRef.current?.unsubscribe?.();
    subscriptionRef.current = null;
    consumerRef.current?.disconnect?.();
    consumerRef.current = null;
    downloadTriggeredRef.current = false;
    setDownloadToken(null);
    setDownloadProgress(0);
    setDownloadMessage("");
    setIsStartingDownload(false);
  }, []);

  const closeDownloadModal = useCallback(() => {
    setIsDownloadModalOpen(false);
    resetDownloadState();
  }, [resetDownloadState]);

  useEffect(
    () => () => {
      resetDownloadState();
    },
    [resetDownloadState]
  );

  useEffect(() => {
    if (!isDownloadModalOpen) return;

    if (!downloadToken) return;

    if (downloadProgress < 100) return;

    if (downloadTriggeredRef.current) return;

    downloadTriggeredRef.current = true;

    (async () => {
      try {
        const blob = await downloadPostPdfExport(slug, downloadToken);
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = slug ? `${slug}.pdf` : "";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
      } finally {
        closeDownloadModal();
      }
    })();
  }, [
    closeDownloadModal,
    downloadProgress,
    downloadToken,
    isDownloadModalOpen,
    slug,
  ]);

  const startDownload = useCallback(async () => {
    if (!slug || isPreview) return;

    setIsDownloadModalOpen(true);
    setIsStartingDownload(true);
    setDownloadProgress(0);
    setDownloadMessage(t("blog.downloadModal.starting"));

    subscriptionRef.current?.unsubscribe?.();
    consumerRef.current?.disconnect?.();

    consumerRef.current = createConsumer();
    subscriptionRef.current = subscribeToBlogDownloadChannel({
      consumer: consumerRef.current,
      setMessage: setDownloadMessage,
      setProgress: setDownloadProgress,
      generatePdf: async () => {
        try {
          const data = await createPostPdfExport(slug);
          setDownloadToken(data?.token);
        } catch {
          Toastr.error(t("common.somethingWentWrong"));
          closeDownloadModal();
        } finally {
          setIsStartingDownload(false);
        }
      },
    });
  }, [closeDownloadModal, isPreview, slug, t]);

  return {
    isDownloadModalOpen,
    closeDownloadModal,
    downloadProgress: clampPercentage(downloadProgress),
    downloadMessage,
    isStartingDownload,
    startDownload,
  };
};

export default useBlogPdfDownload;
