// Code generated by go run ./scripts/vetted-filters/main.go; DO NOT EDIT.

/* eslint quote-props: 'off', quotes: 'off', comma-dangle: 'off', semi: 'off' */

export default {
    "categories": {
        "general": {
            "name": "filter_category_general",
            "description": "filter_category_general_desc"
        },
        "other": {
            "name": "filter_category_other",
            "description": "filter_category_other_desc"
        },
        "regional": {
            "name": "filter_category_regional",
            "description": "filter_category_regional_desc"
        },
        "security": {
            "name": "filter_category_security",
            "description": "filter_category_security_desc"
        }
    },
    "filters": {
        "1hosts_lite": {
            "name": "1Hosts (Lite)",
            "categoryId": "general",
            "homepage": "https://badmojr.github.io/1Hosts/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_24.txt"
        },
        "1hosts_mini": {
            "name": "1Hosts (mini)",
            "categoryId": "general",
            "homepage": "https://badmojr.github.io/1Hosts/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_38.txt"
        },
        "CHN_adrules": {
            "name": "CHN: AdRules DNS List",
            "categoryId": "regional",
            "homepage": "https://github.com/Cats-Team/AdRules",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_29.txt"
        },
        "CHN_anti_ad": {
            "name": "CHN: anti-AD",
            "categoryId": "regional",
            "homepage": "https://anti-ad.net/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_21.txt"
        },
        "HUN_hufilter": {
            "name": "HUN: Hufilter",
            "categoryId": "regional",
            "homepage": "https://github.com/hufilter/hufilter",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_35.txt"
        },
        "IDN_abpindo": {
            "name": "IDN: ABPindo",
            "categoryId": "regional",
            "homepage": "https://github.com/ABPindo/indonesianadblockrules",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_22.txt"
        },
        "IRN_unwanted_iranian_domains": {
            "name": "IRN: PersianBlocker list",
            "categoryId": "regional",
            "homepage": "https://github.com/MasterKia/PersianBlocker",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_19.txt"
        },
        "ISR_easyList_hebrew": {
            "name": "ISR: EasyList Hebrew",
            "categoryId": "regional",
            "homepage": "https://github.com/easylist/EasyListHebrew",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_43.txt"
        },
        "KOR_list_kr": {
            "name": "KOR: List-KR DNS",
            "categoryId": "regional",
            "homepage": "https://github.com/List-KR/List-KR",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_25.txt"
        },
        "KOR_youslist": {
            "name": "KOR: YousList",
            "categoryId": "regional",
            "homepage": "https://github.com/yous/YousList",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_15.txt"
        },
        "LIT_easylist_lithuania": {
            "name": "LIT: EasyList Lithuania",
            "categoryId": "regional",
            "homepage": "https://github.com/EasyList-Lithuania/easylist_lithuania",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_36.txt"
        },
        "MKD_macedonian_pi_hole_blocklist": {
            "name": "MKD: Macedonian Pi-hole Blocklist",
            "categoryId": "regional",
            "homepage": "https://github.com/cchevy/macedonian-pi-hole-blocklist",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_20.txt"
        },
        "NOR_dandelion_sprouts_anti_malware_list": {
            "name": "NOR: Dandelion Sprouts nordiske filtre",
            "categoryId": "regional",
            "homepage": "https://github.com/DandelionSprout/adfilt",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_13.txt"
        },
        "POL_cert_polska_list_of_malicious_domains": {
            "name": "POL: CERT Polska List of malicious domains",
            "categoryId": "regional",
            "homepage": "https://cert.pl/posts/2020/03/ostrzezenia_phishing/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_41.txt"
        },
        "POL_polish_filters_for_pi_hole": {
            "name": "POL: Polish filters for Pi-hole",
            "categoryId": "regional",
            "homepage": "https://www.certyficate.it/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_14.txt"
        },
        "SWE_frellwit_swedish_hosts_file": {
            "name": "SWE: Frellwit's Swedish Hosts File",
            "categoryId": "regional",
            "homepage": "https://github.com/lassekongo83/Frellwits-filter-lists/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_17.txt"
        },
        "TUR_turk_adlist": {
            "name": "TUR: turk-adlist",
            "categoryId": "regional",
            "homepage": "https://github.com/bkrucarci/turk-adlist",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_26.txt"
        },
        "TUR_turkish_ad_hosts": {
            "name": "TUR: Turkish Ad Hosts",
            "categoryId": "regional",
            "homepage": "https://github.com/symbuzzer/Turkish-Ad-Hosts",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_40.txt"
        },
        "VNM_abpvn": {
            "name": "VNM: ABPVN List",
            "categoryId": "regional",
            "homepage": "http://abpvn.com/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_16.txt"
        },
        "adguard_dns_filter": {
            "name": "AdGuard DNS filter",
            "categoryId": "general",
            "homepage": "https://github.com/AdguardTeam/AdGuardSDNSFilter",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_1.txt"
        },
        "adguard_popup_filter": {
            "name": "AdGuard DNS Popup Hosts filter",
            "categoryId": "general",
            "homepage": "https://github.com/AdguardTeam/AdGuardSDNSFilter",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_59.txt"
        },
        "awavenue_ads_rule": {
            "name": "AWAvenue Ads Rule",
            "categoryId": "general",
            "homepage": "https://awavenue.top/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_53.txt"
        },
        "curben_phishing_filter": {
            "name": "Phishing URL Blocklist (PhishTank and OpenPhish)",
            "categoryId": "security",
            "homepage": "https://gitlab.com/malware-filter/phishing-filter",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_30.txt"
        },
        "dan_pollocks_list": {
            "name": "Dan Pollock's List",
            "categoryId": "general",
            "homepage": "https://someonewhocares.org/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_4.txt"
        },
        "dandelion_sprouts_anti_malware_list": {
            "name": "Dandelion Sprout's Anti-Malware List",
            "categoryId": "security",
            "homepage": "https://github.com/DandelionSprout/adfilt",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_12.txt"
        },
        "dandelion_sprouts_anti_push_notifications": {
            "name": "Dandelion Sprout's Anti Push Notifications",
            "categoryId": "other",
            "homepage": "https://github.com/DandelionSprout/adfilt",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_39.txt"
        },
        "dandelion_sprouts_game_console_adblock_list": {
            "name": "Dandelion Sprout's Game Console Adblock List",
            "categoryId": "other",
            "homepage": "https://github.com/DandelionSprout/adfilt",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_6.txt"
        },
        "hagezi_allowlist_referral": {
            "name": "HaGeZi's Allowlist Referral",
            "categoryId": "other",
            "homepage": "https://github.com/hagezi/dns-blocklists#referral",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_45.txt"
        },
        "hagezi_antipiracy_blocklist": {
            "name": "HaGeZi's Anti-Piracy Blocklist",
            "categoryId": "other",
            "homepage": "https://github.com/hagezi/dns-blocklists#piracy",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_46.txt"
        },
        "hagezi_badware_hoster_blocklist": {
            "name": "HaGeZi's Badware Hoster Blocklist",
            "categoryId": "security",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_55.txt"
        },
        "hagezi_dyndns_blocklist": {
            "name": "HaGeZi's DynDNS Blocklist",
            "categoryId": "security",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_54.txt"
        },
        "hagezi_encrypted_dns_vpn_tor_proxy_bypass": {
            "name": "HaGeZi's Encrypted DNS/VPN/TOR/Proxy Bypass",
            "categoryId": "security",
            "homepage": "https://github.com/hagezi/dns-blocklists#bypass",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_52.txt"
        },
        "hagezi_gambling_blocklist": {
            "name": "HaGeZi's Gambling Blocklist",
            "categoryId": "other",
            "homepage": "https://github.com/hagezi/dns-blocklists#gambling",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_47.txt"
        },
        "hagezi_multinormal": {
            "name": "HaGeZi's Normal Blocklist",
            "categoryId": "general",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_34.txt"
        },
        "hagezi_pro": {
            "name": "HaGeZi's Pro Blocklist",
            "categoryId": "general",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_48.txt"
        },
        "hagezi_pro++": {
            "name": "HaGeZi's Pro++ Blocklist",
            "categoryId": "general",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_51.txt"
        },
        "hagezi_samsung_tracker_blocklist": {
            "name": "HaGeZi's Samsung Tracker Blocklist",
            "categoryId": "other",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_61.txt"
        },
        "hagezi_the_worlds_most_abused_tlds": {
            "name": "HaGeZi's The World's Most Abused TLDs",
            "categoryId": "security",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_56.txt"
        },
        "hagezi_threat_intelligence_feeds": {
            "name": "HaGeZi's Threat Intelligence Feeds",
            "categoryId": "security",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_44.txt"
        },
        "hagezi_ultimate": {
            "name": "HaGeZi's Ultimate Blocklist",
            "categoryId": "general",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_49.txt"
        },
        "hagezi_windows_office_tracker_blocklist": {
            "name": "HaGeZi's Windows/Office Tracker Blocklist",
            "categoryId": "other",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_63.txt"
        },
        "hagezi_xiaomi_tracking_blocklist": {
            "name": "HaGeZi's Xiaomi Tracker Blocklist",
            "categoryId": "other",
            "homepage": "https://github.com/hagezi/dns-blocklists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_60.txt"
        },
        "no_google": {
            "name": "No Google",
            "categoryId": "other",
            "homepage": "https://github.com/nickspaargaren/no-google",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_37.txt"
        },
        "nocoin_filter_list": {
            "name": "NoCoin Filter List",
            "categoryId": "security",
            "homepage": "https://github.com/hoshsadiq/adblock-nocoin-list/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_8.txt"
        },
        "oisd_basic": {
            "name": "OISD Blocklist Small",
            "categoryId": "general",
            "homepage": "https://oisd.nl/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_5.txt"
        },
        "oisd_full": {
            "name": "OISD Blocklist Big",
            "categoryId": "general",
            "homepage": "https://oisd.nl/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_27.txt"
        },
        "perflyst_dandelion_sprout_smart_tv_blocklist_for_adguard_home": {
            "name": "Perflyst and Dandelion Sprout's Smart-TV Blocklist",
            "categoryId": "other",
            "homepage": "https://github.com/Perflyst/PiHoleBlocklist",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_7.txt"
        },
        "peter_lowe_list": {
            "name": "Peter Lowe's Blocklist",
            "categoryId": "general",
            "homepage": "https://pgl.yoyo.org/adservers/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_3.txt"
        },
        "phishing_army": {
            "name": "Phishing Army",
            "categoryId": "security",
            "homepage": "https://phishing.army/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_18.txt"
        },
        "scam_blocklist_by_durablenapkin": {
            "name": "Scam Blocklist by DurableNapkin",
            "categoryId": "security",
            "homepage": "https://github.com/durablenapkin/scamblocklist",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_10.txt"
        },
        "shadowwhisperers_dating_list": {
            "name": "ShadowWhisperer's Dating List",
            "categoryId": "other",
            "homepage": "https://github.com/ShadowWhisperer/BlockLists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_57.txt"
        },
        "shadowwhisperers_malware_list": {
            "name": "ShadowWhisperer's Malware List",
            "categoryId": "security",
            "homepage": "https://github.com/ShadowWhisperer/BlockLists",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_42.txt"
        },
        "staklerware_indicators_list": {
            "name": "Stalkerware Indicators List",
            "categoryId": "security",
            "homepage": "https://github.com/AssoEchap/stalkerware-indicators",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_31.txt"
        },
        "steven_blacks_list": {
            "name": "Steven Black's List",
            "categoryId": "general",
            "homepage": "https://github.com/StevenBlack/hosts",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_33.txt"
        },
        "the_big_list_of_hacked_malware_web_sites": {
            "name": "The Big List of Hacked Malware Web Sites",
            "categoryId": "security",
            "homepage": "https://github.com/mitchellkrogza/The-Big-List-of-Hacked-Malware-Web-Sites",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_9.txt"
        },
        "ublock_badware_risks": {
            "name": "uBlock₀ filters – Badware risks",
            "categoryId": "security",
            "homepage": "https://github.com/uBlockOrigin/uAssets",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_50.txt"
        },
        "ukrainian_security_filter": {
            "name": "Ukrainian Security Filter",
            "categoryId": "other",
            "homepage": "https://github.com/braveinnovators/ukrainian-security-filter",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_62.txt"
        },
        "urlhaus_filter_online": {
            "name": "Malicious URL Blocklist (URLHaus)",
            "categoryId": "security",
            "homepage": "https://urlhaus.abuse.ch/",
            "source": "https://jqknono.github.io/HostlistsRegistry/assets/filter_11.txt"
        }
    }
}
