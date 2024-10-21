import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


const TermsOfUsePage = () => {
	const {t}= useTranslation();
	return (
		<Wrapper>
			<MainHeader />
			<div className="min-h-screen mt-24 font-montserratRegular text-black mx-[10vw]">
				<h1 className={`text-h2s font-kharkiv mb-8`}>{t('terms_of_use')}</h1>

				{/* Контент с анимациями */}
				<div className="space-y-10 text-lg leading-relaxed">
					<section >
						<h2 className="text-h5 font-semibold mb-4">1. {t('introduction')}</h2>
						<p className="text-pl">
							{t('terms_of_use_description')}
						</p>
					</section>

					<section >
						<h2 className="text-h5 font-semibold mb-4">2. {t('content_usage')}</h2>
						<p className="text-pl">
							{t('content_usage_description')}
						</p>
					</section>

					<section >
						<h2 className="text-h5 font-semibold mb-4">3. {t('users_responsibility')}</h2>
						<p className="text-pl">
							{t('users_responsibility_description')}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">4. {t('disclaimer')}</h2>
						<p className="text-pl">
							{t('disclaimer_description')}
						</p>
					</section>

					<section >
						<h2 className="text-h5 font-semibold mb-4">5. {t('confidentiality')}</h2>
						<p className="text-pl">
							{t('privacy_description1')} <Link to="/privacy-policy" className="text-blue-700 hover:underline">{t('political_of_privacy')}</Link>.
							{t('privacy_description2')}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">6. {t('changes_about_terms_of_use')}</h2>
						<p className="text-pl">
							{t('changes_about_terms_of_use2')}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">7. {t('contacts')}</h2>
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
