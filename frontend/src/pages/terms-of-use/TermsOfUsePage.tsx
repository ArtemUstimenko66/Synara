import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";


const TermsOfUsePage = () => {
	const {t}= useTranslation();
	return (
		<Wrapper>
			<Helmet>
				<title>{t('helmet_terms')}</title>
				<meta name="description" content="Ознайомтеся з правилами використання платформи Synara. Всі користувачі повинні дотримуватися цих правил." />
				<meta name="keywords" content="правила, використання, Synara, платформа, користувач" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://synara.help/terms-of-use" />
			</Helmet>

			<MainHeader />
			<div className="min-h-screen mt-24 font-montserratRegular text-black mx-[10vw]">
				<h1 className={`text-h2s font-kharkiv mb-8`}>{t('terms_of_use')}</h1>

				{/* Контент с анимациями */}
				<div className="space-y-10 text-lg leading-relaxed">
					<section>
						<h2 className="text-h5 font-semibold mb-4">{t('section_1_title')}</h2>
						<p className="text-pl">
							{t('section_1_content_1')}
						</p>
						<p className="text-pl">
							{t('section_1_content_2')}
						</p>
						<p className="text-pl">
							{t('section_1_content_3')}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">{t('section_2_title')}</h2>
						<p className="text-pl">
							{t('section_2_content_1')}
						</p>
						<p className="text-pl">
							{t('section_2_content_2')}
						</p>
						<p className="text-pl">
							{t('section_2_content_3')}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">{t('section_3_title')}</h2>
						<p className="text-pl">
							{t('section_3_content_1')}
						</p>
						<p className="text-pl">
							{t('section_3_content_2')}
						</p>
						<p className="text-pl">
							{t('section_3_content_3')}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">{t('section_4_title')}</h2>
						<p className="text-pl">
							{t('section_4_content_1')}
						</p>
						<p className="text-pl">
							{t('section_4_content_2')}
						</p>
					</section>


					<section>
						<h2 className="text-h5 font-semibold mb-4"> {t('contacts')}</h2>
						<p className="text-pl">
							{t('if_you_have_questions_mail_to')}
							<a href="mailto:synara.support@email.com" className="text-blue-700 hover:underline ml-2">
								synara.support@email.com
							</a>.
						</p>
					</section>
				</div>
			</div>

			<Footer />
		</Wrapper>
	);
};

export default TermsOfUsePage;
