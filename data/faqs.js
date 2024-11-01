import { useTranslation } from "react-i18next";

const { t } = useTranslation();

export const FaqsData = [
  { question: t('faqs.q1.question'), answer: t('faqs.q1.answer') },
  { question: t('faqs.q2.question'), answer: t('faqs.q2.answer') },
  { question: t('faqs.q3.question'), answer: t('faqs.q3.answer') },
  { question: t('faqs.q4.question'), answer: t('faqs.q4.answer') },
  { question: t('faqs.q5.question'), answer: t('faqs.q5.answer') },
  { question: t('faqs.q6.question'), answer: t('faqs.q6.answer') }
];