import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";

const animationFadeIn = "animate-fadeIn";
const animationSlideIn = "animate-slideIn";

const CookiePolicyPage = () => {
	const {t} = useTranslation();
	return (
		<Wrapper>
			<Helmet>
				<title>Політика використання cookie - Synara</title>
				<meta name="description" content="Дізнайтеся про нашу політику використання кукі на платформі Synara." />
				<meta name="keywords" content="кукі, політика, Synara, українці, конфіденційність" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://synara.help/cookie-policy" />
			</Helmet>
			<MainHeader />
			<div className="min-h-screen mt-24 mx-[10vw] font-montserratRegular text-black">
				<h1 className={`text-h3 font-kharkiv mb-8 ${animationFadeIn}`}>
					{t('cookie_policy')}
				</h1>

				<div className="space-y-10 text-lg leading-relaxed">
					<section className={`${animationSlideIn} delay-100`}>
						<h2 className="text-h5 font-semibold mb-4">
							{t('cookie_policy_intro')}
						</h2>
						<p className="text-pl">
							{t('cookie_policy_description')}
						</p>
					</section>

					<section className={`${animationSlideIn} delay-200`}>
						<h2 className="text-h5 font-semibold mb-4">
							{t('what_are_cookies')}
						</h2>
						<p className="text-pl">
							{t('what_are_cookies_description')}
						</p>
					</section>

					<section className={`${animationSlideIn} delay-300`}>
						<h2 className="text-h5 font-semibold mb-4">
							{t('types_of_cookies')}
						</h2>
						<p className="text-pl">
							{t('types_of_cookies_intro')}
						</p>
						<ul className="list-disc list-inside">
							<li>
								<strong>{t('session_cookies')}:</strong> {t('session_cookies_description')}
							</li>
							<li>
								<strong>{t('persistent_cookies')}:</strong> {t('persistent_cookies_description')}
							</li>
							<li>
								<strong>{t('third_party_cookies')}:</strong> {t('third_party_cookies_description')}
							</li>
						</ul>
					</section>


					<section className={`${animationSlideIn} delay-400`}>
						<h2 className="text-h5 font-semibold mb-4">{t('why_we_use_cookies')}</h2>
						<p className="text-pl">{t('why_we_use_cookies_intro')}</p>
						<ul className="list-disc list-inside">
							<li><strong>{t('site_functionality')}:</strong> {t('site_functionality_description')}</li>
							<li><strong>{t('analytics')}:</strong> {t('analytics_description')}</li>
							<li>
								<strong>{t('advertising_and_marketing')}:</strong> {t('advertising_and_marketing_description')}
							</li>
						</ul>
					</section>

					<section className={`${animationSlideIn} delay-500`}>
						<h2 className="text-h5 font-semibold mb-4">{t('how_to_manage_cookies')}</h2>
						<p className="text-pl">{t('manage_cookies_intro')}</p>
						<ul className="list-disc list-inside">
							<li>{t('manage_cookies_browser')}</li>
							<li>{t('opt_out_of_third_party_cookies')}</li>
						</ul>
					</section>

					<section className={`${animationSlideIn} delay-600`}>
						<h2 className="text-h5 font-semibold mb-4">{t('cookie_policy_updates')}</h2>
						<p className="text-pl">{t('cookie_policy_updates_description')}</p>
					</section>

					<section className={`${animationSlideIn} delay-700`}>
						<h2 className="text-h5 font-semibold mb-4">{t('contact_info')}</h2>
						<p className="text-pl">
							{t('contact_info_description')}
							<a href="mailto:synara.support@email.com" className="text-blue-700 hover:underline ml-2">
								synara.support@email.com
							</a>.
						</p>
						<p className="text-pl mt-5">{t('cookie_policy_purpose')}</p>
					</section>
				</div>
			</div>

			<Footer/>
		</Wrapper>
	)
		;
};

export default CookiePolicyPage;
