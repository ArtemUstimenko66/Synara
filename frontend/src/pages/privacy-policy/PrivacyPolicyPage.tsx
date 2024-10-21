import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import {useTranslation} from "react-i18next";


const PrivacyPolicyPage = () => {
	const {t} = useTranslation();
	return (
		<Wrapper>
			<MainHeader />
			<div className="min-h-screen mt-24 mx-[10vw] font-montserratRegular">
				<h1 className="sm:text-h3 xl:text-h2 md:text-h2 font-kharkiv mb-8">{t('privacy_policy')}</h1>


				<div className="space-y-10 text-lg leading-relaxed">
					<section>
						<h2 className="text-h5 font-semibold mb-4">1. {t('introduction')}</h2>
						<p className="text-pl">
							{t('privacy_policy_introduction')}
						</p>
					</section>

					<section >
						<h2 className="text-h5 font-semibold mb-4">2. {t('gathering_info')}</h2>
						<p className="text-pl">
							{t("during_of_usage_site")}
							<ul className="list-disc ml-5 mt-2">
								<li>{t('your_name_email')}</li>
								<li>{t('details_of_request')}</li>
								<li>{t('info_about_your_coordinates')}</li>
								<li>{t('technical_information')}</li>
							</ul>
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">3. {t('data_usage')}</h2>
						<p className="text-pl">
							{t('collected_data_need_for')}
							<ul className="list-disc ml-5 mt-2">
								<li>{t('collected_data_need_for1')}</li>
								<li>{t('collected_data_need_for2')}</li>
								<li>{t('collected_data_need_for3')}</li>
							</ul>
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">4. {t('info_protection')}</h2>
						<p className="text-pl">
							{t('info_protection_desc')}
						</p>

					</section>

					<section >
						<h2 className="text-h5 font-semibold mb-4">5. {t('user_rights')}</h2>
						<p className="text-pl">
							{t('user_rights_desc')}
						</p>
					</section>

					<section >
						<h2 className="text-h5 font-semibold mb-4">6. {t('transferring_data')}</h2>
						<p className="text-pl">
							{t('transferring_data_desc')}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">7. {t('changes_to_private_policy')}</h2>
						<p className="text-pl">
							{t('changes_to_private_policy_desc')}
						</p>
					</section>

					<section >
						<h2 className="text-h5 font-semibold mb-4">8. {t('contacts')}</h2>
						<p className="text-pl">
							{t('if_you_gave_any_questions_contact')}:
							<a href="mailto:synara.support@email.com" className="text-blue-500 hover:underline ml-2">
								synara.support@email.com
							</a>
						</p>
					</section>
				</div>
			</div>

			{/* Футер */}
			<Footer />
		</Wrapper>
	);
};

export default PrivacyPolicyPage;
