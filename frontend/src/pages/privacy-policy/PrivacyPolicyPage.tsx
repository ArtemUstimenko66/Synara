import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";


const PrivacyPolicyPage = () => {
	const {t} = useTranslation();
	return (
		<Wrapper>
			<Helmet>
				<title>Політика конфіденційності - Synara</title>
				<meta name="description" content="Дізнайтеся про нашу політику конфіденційності на платформі Synara. Як ми захищаємо вашу інформацію." />
				<meta name="keywords" content="політика конфіденційності, Synara, захист інформації, користувач" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://synara.help/privacy-policy" />
			</Helmet>

			<MainHeader />
			<div className="min-h-screen mt-24 mx-[10vw] font-montserratRegular">
				<h1 className="sm:text-h3 xl:text-h2 md:text-h2 font-kharkiv mb-8">{t('privacy_policy')}</h1>


				<div className="space-y-10 text-lg leading-relaxed">
					<section>
						<p className="text-pl">
							{t('privacy_policy_introduction')}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">1. {t('gathering_info')}</h2>
						<p className="text-pl">
							1.1. {t("privacy_policy_gathering_1")}
						</p>
						<p className="text-pl">
							1.2. {t("privacy_policy_gathering_2")}
						</p>
						<p className="text-pl">
							1.3. {t("privacy_policy_gathering_3")}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">2. {t("data_transfer")}</h2>
						<p className="text-pl">
							2.1. {t("privacy_policy_data_transfer_1")}
						</p>
						<p className="text-pl">
							2.2. {t("privacy_policy_data_transfer_2")}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">3. {t("data_protection")}</h2>
						<p className="text-pl">
							3.1. {t("privacy_policy_data_protection_1")}
						</p>
						<p className="text-pl">
							3.2. {t("privacy_policy_data_protection_2")}
						</p>
						<p className="text-pl">
							3.2. {t("privacy_policy_data_protection_3")}
						</p>
					</section>

					<section>
						<h2 className="text-h5 font-semibold mb-4">4. {t('user_rights')}</h2>
						<p className="text-pl">
							4.1. {t("privacy_policy_user_rights_1")}
						</p>

					</section>

					<h2 className="sm:text-h3 xl:text-h2 md:text-h2 font-kharkiv mb-8">{t('financial_transactions')}</h2>
					<section>
						<h2 className="text-h5 font-semibold mb-4">1. {t('payment_processing')}</h2>
						<p className="text-pl">
							1.1. {t('payment_processing_1')}
						</p>
						<p className="text-pl">
							1.2. {t('payment_processing_2')}
						</p>
					</section>
					<section>
						<h2 className="text-h5 font-semibold mb-4">2. {t('refunds')}</h2>
						<p className="text-pl">
							2.1. {t('refunds_1')}
						</p>
					</section>
					<section>
						<h2 className="text-h5 font-semibold mb-4">3. {t('tax_responsibility')}</h2>
						<p className="text-pl">
							3.1. {t('tax_responsibility_1')}
						</p>
					</section>


					<section>
						<p className="text-pl">
							{t("privacy_policy_user_rights_2")}
							<a href="mailto:synara.support@email.com" className="text-blue-500 hover:underline ml-2">
								synara.support@email.com
							</a>
						</p>
					</section>

				</div>
			</div>

			<Footer/>
		</Wrapper>
	);
};

export default PrivacyPolicyPage;
