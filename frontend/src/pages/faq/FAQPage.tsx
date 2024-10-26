import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import { useState } from "react";
import DownArrow from '../../assets/images/Down_Arrow.svg?react';
import { useTranslation } from "react-i18next";


// @ts-ignore
const AccordionItem = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border border-gray-300 px-2 mb-1 rounded-lg">
			<button
				className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="font-montserratRegular">{question}</span>
				<span>{isOpen ? <DownArrow className="rotate-180  mr-2 w-3 h-3"/> : <DownArrow className=" mr-2 w-3 h-3"/>}</span>
			</button>
			{isOpen && <p className="font-montserratRegular pb-4">{answer}</p>}
		</div>
	);
};

const FAQPage = () => {
	const { t } = useTranslation();

	const questionsSection1 = [
		{ question: t("whatAboutSynara"), answer: t("answerAboutSynara") },
		{ question: t("aboutMetaPlatform"), answer: t("answerAboutMeta") },
		{ question: t("aboutUserPlatform"), answer: t("answerUserPlatfrom") },
		{ question: t("howToRegPlatform"), answer: t("answerHowToReg") }
	];

	const questionsSection2 = [
		{ question: t("howToCreateHelp"), answer: t("answerToCreateHelp") },
		{ question: t("aboutTypeHelp"), answer: t("answerTypeHelp") },
		{ question: t("howToSeekVolunteer"), answer: t("answerToSeekVolunteer") },
		{ question: t("aboutSecurityPlatform"), answer: t("answerAboutSecurityPlatform") },
		{ question: t("howToSpeakWithVolunteer"), answer: t("answterToSpeakWithVolunteer") }
	];

	const questionsSection3 = [
		{ question: t("howToBeVolunteer"), answer: t("answerToBeVolunteer") },
		{ question: t("howToSeekAnnouncement"), answer: t("answerSeekAnnoucement") },
		{ question: t("howToSendYourHelp"), answer: t("answerToSendYourHelp") },
		{ question: t("howToTakeCertificate"), answer: t("answerToTakeCertificate") },
		{ question: t("howToTakeHelpWithVolunteer"), answer: t("howToTakeHelpWithVolunteer") }
	];

	const questionsSection4 = [
		{ question: t("howToChangePassword"), answer: t("answerToChangePassword") },
		{ question: t("howToUpdateEmail"), answer: t("answerToUpdateEmail") },
		{ question: t("howToDeleteEmail"), answer: t("answerAboutDeleteEmail") },
		{ question: t("howDecideTech"), answer: t("answerDecideTech") }
	];

	return (
		<Wrapper>
			<MainHeader />
			<div className="min-h-screen mt-20 ml-[3%] mr-[3%]">
				<h1 className="text-h2 font-kharkiv uppercase">{t('MostpoweredUPPER')}</h1>
				<h2 className="text-h3 font-kharkiv mt-8">{t('faqFromPlatfom')}:</h2>

				{/* Section 1 */}
				<div className="mt-8">
					{questionsSection1.map((q, index) => (
						<AccordionItem key={index} question={q.question} answer={q.answer} />
					))}
				</div>

				{/* Section 2 */}
				<h2 className="text-h3 font-kharkiv mt-12">{t('questionFromVictim')}:</h2>
				<div className="mt-8">
					{questionsSection2.map((q, index) => (
						<AccordionItem key={index} question={q.question} answer={q.answer} />
					))}
				</div>

				{/* Section 3 */}
				<h2 className="text-h3 font-kharkiv mt-12">{t('questionForVolunteer')}:</h2>
				<div className="mt-8">
					{questionsSection3.map((q, index) => (
						<AccordionItem key={index} question={q.question} answer={q.answer} />
					))}
				</div>

				{/* Section 4 */}
				<h2 className="text-h3 font-kharkiv mt-12">{t('questionAboutTechnick')}:</h2>
				<div className="mt-8">
					{questionsSection4.map((q, index) => (
						<AccordionItem key={index} question={q.question} answer={q.answer} />
					))}
				</div>
			</div>
			<Footer />
		</Wrapper>
	);
};

export default FAQPage;
