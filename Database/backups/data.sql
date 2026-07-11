SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict ACSfXgHLDRNcIqRq7STojgpljMh26HHdcDFHkG3vT9hoFicFZCz7KYdOoiILf6l

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."custom_oauth_providers" ("id", "provider_type", "identifier", "name", "client_id", "client_secret", "acceptable_client_ids", "scopes", "pkce_enabled", "attribute_mapping", "authorization_params", "enabled", "email_optional", "issuer", "discovery_url", "skip_nonce_check", "cached_discovery", "discovery_cached_at", "authorization_url", "token_url", "userinfo_url", "jwks_uri", "created_at", "updated_at", "custom_claims_allowlist") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
00000000-0000-0000-0000-000000000000	ef15cee2-5a7f-446e-a8f3-3f0c01e80309	authenticated	authenticated	maisreynuth@gmail.com	$2a$10$1JWNVtE2gXXJaJBcFSAmDe0xpDrCv/Kvo4t2jbVttXTYI4NYgmPJ.	2026-06-09 12:51:05.077363+00	\N		\N		\N			\N	2026-06-09 13:58:53.222267+00	{"provider": "email", "providers": ["email"]}	{"sub": "ef15cee2-5a7f-446e-a8f3-3f0c01e80309", "email": "maisreynuth@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-09 12:51:05.051484+00	2026-06-09 13:58:53.224339+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ff9d87aa-2c0d-48b0-a72b-62081fd318f9	authenticated	authenticated	maisreynuth1@gmail.com	$2a$10$K524TYxYuvsbWwKHXPezJuFLPxjMk12iluXLo32RkeYGs73rhrqGm	2026-06-09 14:07:35.621544+00	\N		\N		\N			\N	2026-06-09 16:09:34.597129+00	{"provider": "email", "providers": ["email"]}	{"sub": "ff9d87aa-2c0d-48b0-a72b-62081fd318f9", "email": "maisreynuth1@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-09 14:07:35.606805+00	2026-06-15 02:09:53.363008+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	8ae26299-1ad0-42de-b05f-ed17dabf6081	authenticated	authenticated	yannlaie12@gmail.com	$2a$10$mCYo.c6wI9EeOuHjEmxedOfXLSTEKluJ/nXnxnlk6.C3DMIVDfqam	\N	\N	b3f86ab2b8f038f86eb3825fcd904c2ff97f4875474d15b1b804bab4	2026-06-09 09:40:28.053251+00		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"sub": "8ae26299-1ad0-42de-b05f-ed17dabf6081", "email": "yannlaie12@gmail.com", "email_verified": false, "phone_verified": false}	\N	2026-06-09 09:40:28.032174+00	2026-06-09 09:40:29.444006+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	a5a27b83-c446-4c4c-a2f5-2e7cd94f8467	authenticated	authenticated	yannseaklay123@gmail.com	$2a$10$k.S3/V/DsiWCRQ/ehYBvF.tidOenD9EkzzXTtKDPIkD5MqUVmnZ02	\N	\N	3d88560e4f57e0dca7331090ff49daeb4027ea002bda58ce61534abd	2026-06-09 07:51:50.717417+00		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"sub": "a5a27b83-c446-4c4c-a2f5-2e7cd94f8467", "email": "yannseaklay123@gmail.com", "email_verified": false, "phone_verified": false}	\N	2026-06-09 07:51:50.689023+00	2026-06-09 07:51:52.132033+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	248c8164-c286-423c-99a4-972d4ffc6c04	authenticated	authenticated	yann12@gmail.com	$2a$10$5PSKj9MOYY05Sya3YGHUtuYxygQr9nTKN8dda.VZMttXUDD6mVnvu	2026-06-09 10:34:05.729561+00	\N		\N		\N			\N	2026-06-09 10:35:54.527674+00	{"provider": "email", "providers": ["email"]}	{"sub": "248c8164-c286-423c-99a4-972d4ffc6c04", "email": "yann12@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-09 10:34:05.705584+00	2026-06-09 10:35:54.549013+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	72284bc0-d3d6-4cfe-8777-3c0485682cc3	authenticated	authenticated	lymeas9999@gmail.com	$2a$10$NwyMZ/ZmZ0SiRg7xxxXj0unqIkwJCj2kQcRkEjVIAdGzfwGbcCNGC	2026-06-16 02:26:46.876539+00	\N		\N		\N			\N	2026-06-22 06:05:28.912637+00	{"provider": "email", "providers": ["email"]}	{"sub": "72284bc0-d3d6-4cfe-8777-3c0485682cc3", "email": "lymeas9999@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-16 02:26:46.848215+00	2026-06-22 07:06:02.629294+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	4d19b920-e211-4536-a988-3aa9903067cb	authenticated	authenticated	yannlaie123@gmail.com	$2a$10$GcUgJJrnXicnKHDvxiEMjeHCoqYvMTjIsTMo4T08JuD5MheCRihQe	\N	\N	b352fa957dcc15f08a65bb1ce5c58f325d6398960cc31998e0018489	2026-06-09 09:25:35.889096+00		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"sub": "4d19b920-e211-4536-a988-3aa9903067cb", "email": "yannlaie123@gmail.com", "email_verified": false, "phone_verified": false}	\N	2026-06-09 09:25:35.859027+00	2026-06-09 09:25:37.506964+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ec130a1b-822f-4cb5-a363-7ac7256783ea	authenticated	authenticated	sdgwergsgw@gmail.com	$2a$10$H/QDTclDhVfIhM40wJHsYOGN51/OYrEqtSG.NlRtxltTSuGixbJFy	2026-06-09 10:00:37.252575+00	\N		\N		\N			\N	2026-06-09 10:00:37.257174+00	{"provider": "email", "providers": ["email"]}	{"sub": "ec130a1b-822f-4cb5-a363-7ac7256783ea", "email": "sdgwergsgw@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-09 10:00:37.242343+00	2026-06-09 10:00:37.272568+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	4c35709e-646b-4f8d-8555-5773898f638a	authenticated	authenticated	sreynuthmai8@gmail.com	$2a$10$tbJzhz2A5EY8VOFyiPDf8Oud1cygA0n3UE2fJVqdP1UvILJmgyodK	2026-06-15 02:28:22.864014+00	\N		\N		\N			\N	2026-07-10 17:13:34.764508+00	{"provider": "email", "providers": ["email"]}	{"sub": "4c35709e-646b-4f8d-8555-5773898f638a", "email": "sreynuthmai8@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-15 02:28:22.83872+00	2026-07-10 17:13:34.769931+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	e220ec64-7b21-4af6-a7a8-93dd303893e9	authenticated	authenticated	nuthnuth@gmail.com	$2a$10$UTNmCl0LesBsFGRxns581urSuW2tgRk7t1tp8BQdpiQRxjFEYpRGq	2026-06-16 02:34:53.634584+00	\N		\N		\N			\N	2026-06-16 02:35:24.20062+00	{"provider": "email", "providers": ["email"]}	{"sub": "e220ec64-7b21-4af6-a7a8-93dd303893e9", "email": "nuthnuth@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-16 02:34:53.621322+00	2026-06-16 02:35:24.202872+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	e62ef754-b15b-40cf-af7c-dace2c12e2b4	authenticated	authenticated	seaklay123@gmail.com	$2a$10$9azziFBQjb2JrfLGLj4GHeOo9B/3Wvzb4nYv7YD/DZHimqmFvpk/y	2026-06-09 10:44:29.947419+00	\N		\N		\N			\N	2026-06-09 10:59:04.087782+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2026-06-09 10:44:29.941318+00	2026-06-09 13:01:39.322792+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	d26d7109-aa21-4aff-be7a-52b094d294fa	authenticated	authenticated	yannseaklay2412@gmail.com	$2a$10$IW3XIFb9sRrsb17XgNNIiu/VCDNVmodn66zCQMbCkgw6cnZo6M/TG	2026-06-09 10:38:50.921363+00	2026-06-09 10:38:16.101549+00		\N		\N			\N	2026-07-11 04:42:40.251367+00	{"provider": "email", "providers": ["email"]}	{"sub": "d26d7109-aa21-4aff-be7a-52b094d294fa", "email": "yannseaklay2412@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-09 06:33:45.754578+00	2026-07-11 07:54:51.24501+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	e9154374-cb36-40e7-9f3e-c19f685b779d	authenticated	authenticated	admin123@gmail.com	$2a$10$ZkatbeWokLKTacWZJ4ajYOC7X3YtKtgwkvdIviq7OuodLNIKG1zXi	2026-06-15 02:38:58.887779+00	\N		\N		\N			\N	2026-07-11 04:26:05.105356+00	{"provider": "email", "providers": ["email"]}	{"sub": "e9154374-cb36-40e7-9f3e-c19f685b779d", "email": "admin123@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-15 02:38:58.868083+00	2026-07-11 04:26:05.125982+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	e914c318-0ace-458b-92e3-f6d7fc9064bb	authenticated	authenticated	you123@gamil.com	$2a$10$Hziwdn1feab6Xy7O7BdmH.9g81Dz6P6W44eZM0z6Ohy6On4Vnv7/W	2026-06-16 02:33:29.536376+00	\N		\N		\N			\N	2026-06-16 04:05:28.088159+00	{"provider": "email", "providers": ["email"]}	{"sub": "e914c318-0ace-458b-92e3-f6d7fc9064bb", "email": "you123@gamil.com", "email_verified": true, "phone_verified": false}	\N	2026-06-16 02:33:29.477033+00	2026-06-16 04:05:28.090425+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	fde5aff7-1517-470f-ad94-2b4ac5227f59	authenticated	authenticated	sreynuth@gmailcom	$2a$10$bAi5b1ZJS0Fkt51KnVTi1OwddMO7K4gqLBR0opqZ0tFqHKVP48LyC	2026-06-16 02:36:16.261611+00	\N		\N		\N			\N	2026-06-16 02:36:16.265035+00	{"provider": "email", "providers": ["email"]}	{"sub": "fde5aff7-1517-470f-ad94-2b4ac5227f59", "email": "sreynuth@gmailcom", "email_verified": true, "phone_verified": false}	\N	2026-06-16 02:36:16.244994+00	2026-06-16 02:36:16.267084+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	8d0cf94b-46cf-4b20-b12b-6db4cffe065d	authenticated	authenticated	meas123@gmail.com	$2a$10$ZKbdyDCUZV32RLxa6D5JZuHfQiu5bk7xMR/5YR2AWnsgsdiuNmdGG	2026-06-16 04:06:50.174949+00	\N		\N		\N			\N	2026-06-16 04:07:05.322058+00	{"provider": "email", "providers": ["email"]}	{"sub": "8d0cf94b-46cf-4b20-b12b-6db4cffe065d", "email": "meas123@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-16 04:06:50.146017+00	2026-06-16 04:07:05.324296+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c4015fc3-85e6-42f2-a2d4-6eac75ddc45e	authenticated	authenticated	xingrover85@gmail.com	$2a$10$b7nbKAVf9XkKCu7XGBW14eMT0JnYBYuYuxfsz3ba6orV4pIH/6pmm	2026-06-26 17:20:11.57358+00	\N		\N		\N			\N	2026-06-26 17:20:40.93197+00	{"provider": "email", "providers": ["email"]}	{"sub": "c4015fc3-85e6-42f2-a2d4-6eac75ddc45e", "email": "xingrover85@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-26 17:20:11.527232+00	2026-06-26 17:20:40.934506+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	365dec6d-e007-4bde-a127-c5a0dee2fb32	authenticated	authenticated	yannseaklay253213@gmail.com	$2a$10$k6TWZbr43zf6b2iPl/8vleHSXru0El6RR4t0pqnPpMkM.3s4gt/De	2026-06-25 13:22:12.241203+00	\N		\N		\N			\N	2026-06-26 01:50:38.588742+00	{"provider": "email", "providers": ["email"]}	{"sub": "365dec6d-e007-4bde-a127-c5a0dee2fb32", "email": "yannseaklay253213@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-25 13:22:12.207492+00	2026-06-26 01:50:38.591068+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	36127943-0610-4290-b44c-d00e6c1d5e6e	authenticated	authenticated	nuth@gmail.com	$2a$10$J7Wh7ywoyuZjIb4yBFwyPezTggAVYYJFs939IuP5ekl6iQKFhJEYa	2026-06-16 04:04:14.823954+00	\N		\N		\N			\N	2026-06-16 04:04:14.83083+00	{"provider": "email", "providers": ["email"]}	{"sub": "36127943-0610-4290-b44c-d00e6c1d5e6e", "email": "nuth@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-16 04:04:14.804115+00	2026-06-16 04:04:14.836448+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	8475af18-b5d5-49ff-bf73-a174246fe315	authenticated	authenticated	lymeas@gmail.com	$2a$10$5IgPqLo/P.kVyYhaZynXk.SUjF8qmIrxDs5eoFRWq0xD3LCKUmw8i	2026-06-26 03:52:40.387051+00	\N		\N		\N			\N	2026-06-26 03:52:58.586385+00	{"provider": "email", "providers": ["email"]}	{"sub": "8475af18-b5d5-49ff-bf73-a174246fe315", "email": "lymeas@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-26 03:52:40.320807+00	2026-07-09 16:46:40.981197+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	e38b31ce-3d9d-46f4-8b5d-54dd42ed1038	authenticated	authenticated	sreynuthmai@gmail.com	$2a$10$RAQC6Zdy.qyNy1ZvcY.G..g6Ru12B69p62QlpYT3h925EcLaWSUzG	2026-07-08 16:32:27.524371+00	\N		\N		\N			\N	2026-07-10 17:14:48.778416+00	{"provider": "email", "providers": ["email"]}	{"sub": "e38b31ce-3d9d-46f4-8b5d-54dd42ed1038", "email": "sreynuthmai@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-07-08 16:32:27.482646+00	2026-07-10 17:14:48.780795+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	162b1dd3-f73c-4575-ac70-02b17ae313cf	authenticated	authenticated	nith123@gmail	$2a$10$DANckNMS/g0kq31/a3L1yuhRmMyMtBCI6.gQ53bZA/s68O096HgOS	2026-06-16 04:16:07.488728+00	\N		\N		\N			\N	2026-06-16 04:16:29.995813+00	{"provider": "email", "providers": ["email"]}	{"sub": "162b1dd3-f73c-4575-ac70-02b17ae313cf", "email": "nith123@gmail", "email_verified": true, "phone_verified": false}	\N	2026-06-16 04:16:07.461685+00	2026-06-16 04:16:29.997964+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	77ef5472-90d7-42bc-9a61-4c9557055a8b	authenticated	authenticated	laie123@gmail.com	$2a$10$Ki0mJCFJGyuQJHQNQDrSn.3qpT1KXChhFXcCW0On4XRErFEgm2Z5e	2026-06-16 04:07:54.218791+00	\N		\N		\N			\N	2026-06-16 04:16:55.776531+00	{"provider": "email", "providers": ["email"]}	{"sub": "77ef5472-90d7-42bc-9a61-4c9557055a8b", "email": "laie123@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-16 04:07:54.184397+00	2026-06-16 04:16:55.778577+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	b61f5568-3903-4ef4-87ac-b0d16ab484a9	authenticated	authenticated	lay@gmail.com	$2a$10$xtxF0cj8B3f/9KxaLno8qeE/nNkJc8XEIAYD1gf4Vl3dqjXdKE.WS	2026-06-17 05:06:04.875838+00	\N		\N		\N			\N	2026-06-17 05:06:21.652996+00	{"provider": "email", "providers": ["email"]}	{"sub": "b61f5568-3903-4ef4-87ac-b0d16ab484a9", "email": "lay@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-17 05:06:04.843642+00	2026-07-03 02:49:48.669847+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	8b04af03-0c89-4449-8935-f3f133df0c36	authenticated	authenticated	yannlaie741@gmail.com	$2a$10$oO.zlesIwNxA8f4LmxOn7eyHJq4ilv9QKRc6YYrb40ngvkjjWWL/u	2026-06-28 10:49:13.765274+00	\N		\N		\N			\N	2026-06-28 11:39:57.999541+00	{"provider": "email", "providers": ["email"]}	{"sub": "8b04af03-0c89-4449-8935-f3f133df0c36", "email": "yannlaie741@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-28 10:49:13.729712+00	2026-06-28 11:39:58.001835+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	270b1b52-5aef-4e8b-9bc8-60b49bcc6d06	authenticated	authenticated	jeus_holy_water@gmail.com	$2a$10$9IRP2jMzPRLjx8qytB8GC.A5P99Ss6ckLurjGlrzLJFWIUYux/AS.	2026-06-19 07:38:31.137382+00	\N		\N		\N			\N	2026-06-19 07:45:58.986014+00	{"provider": "email", "providers": ["email"]}	{"sub": "270b1b52-5aef-4e8b-9bc8-60b49bcc6d06", "email": "jeus_holy_water@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-19 07:38:31.106991+00	2026-06-19 07:45:58.991197+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c78afe56-ceaf-4cb8-b9a1-127c29d2afe9	authenticated	authenticated	phavy@gmail.com	$2a$10$xdsQjW3z/5DYFo0vipgCyuTK5svV3Et3d0UW810brFQ2QNdf73Jz.	2026-06-16 04:20:50.606455+00	\N		\N		\N			\N	2026-06-16 04:21:04.353415+00	{"provider": "email", "providers": ["email"]}	{"sub": "c78afe56-ceaf-4cb8-b9a1-127c29d2afe9", "email": "phavy@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-16 04:20:50.591347+00	2026-06-16 04:21:04.360019+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9934c511-6f5f-490a-a0cc-6fb9bb930212	authenticated	authenticated	test@gmail.com	$2a$10$U9YeP9I8x9uxc2/zdAk0iuG.7INgohxBD4xq0WJOJFD8dASnJNT32	2026-07-03 02:54:07.123613+00	\N		\N		\N			\N	2026-07-03 03:07:33.887968+00	{"provider": "email", "providers": ["email"]}	{"sub": "9934c511-6f5f-490a-a0cc-6fb9bb930212", "email": "test@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-07-03 02:54:07.109036+00	2026-07-03 03:07:33.890273+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	4d20d06b-4dad-4904-942b-ea9d698a6c19	authenticated	authenticated	maisreynuth7@gmail.com	$2a$10$jKh1LAzOWPCx.IfZbUf2V.PqmnTXa6yW.XMyc7mDUgbqGdd6Z3vPS	2026-06-16 04:22:18.414616+00	\N		\N		\N			\N	2026-07-03 03:11:59.471295+00	{"provider": "email", "providers": ["email"]}	{"sub": "4d20d06b-4dad-4904-942b-ea9d698a6c19", "email": "maisreynuth7@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-16 04:22:18.385678+00	2026-07-03 03:11:59.473559+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	f45a17dd-10d5-49e8-8fc6-53e15f3a9950	authenticated	authenticated	kimhuoyyann@gmail.com	$2a$10$fzW8zcYSq./c/sxA3Di7h.tYbake.EdcmPP1H9ExbvKDFN1Nz9c72	2026-07-09 16:17:07.570849+00	\N		\N		\N			\N	2026-07-09 16:17:14.505378+00	{"provider": "email", "providers": ["email"]}	{"sub": "f45a17dd-10d5-49e8-8fc6-53e15f3a9950", "email": "kimhuoyyann@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-07-09 16:17:07.521902+00	2026-07-09 16:17:14.508135+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	b856b203-3021-4054-82eb-b53810a5c4d4	authenticated	authenticated	maisreynuth8@gmail.com	$2a$10$lIkzs9D.vKO7Ai46fBXKoOfWwJ9CqoZnIaedz6oPqRmQ0pyad2mEm	2026-07-03 03:14:21.478198+00	\N		\N		\N			\N	2026-07-10 03:27:32.634882+00	{"provider": "email", "providers": ["email"]}	{"sub": "b856b203-3021-4054-82eb-b53810a5c4d4", "email": "maisreynuth8@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-07-03 03:14:21.444502+00	2026-07-10 03:27:32.636955+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
a5a27b83-c446-4c4c-a2f5-2e7cd94f8467	a5a27b83-c446-4c4c-a2f5-2e7cd94f8467	{"sub": "a5a27b83-c446-4c4c-a2f5-2e7cd94f8467", "email": "yannseaklay123@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-09 07:51:50.71138+00	2026-06-09 07:51:50.711429+00	2026-06-09 07:51:50.711429+00	a7ad1a93-868d-468e-abe7-99b68028881f
4d19b920-e211-4536-a988-3aa9903067cb	4d19b920-e211-4536-a988-3aa9903067cb	{"sub": "4d19b920-e211-4536-a988-3aa9903067cb", "email": "yannlaie123@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-09 09:25:35.881978+00	2026-06-09 09:25:35.882029+00	2026-06-09 09:25:35.882029+00	d54abba3-495e-4110-9bea-bf08daf5d8c7
8ae26299-1ad0-42de-b05f-ed17dabf6081	8ae26299-1ad0-42de-b05f-ed17dabf6081	{"sub": "8ae26299-1ad0-42de-b05f-ed17dabf6081", "email": "yannlaie12@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-09 09:40:28.047506+00	2026-06-09 09:40:28.047555+00	2026-06-09 09:40:28.047555+00	bc996716-45ea-497c-b3c7-a77c37bd509b
ec130a1b-822f-4cb5-a363-7ac7256783ea	ec130a1b-822f-4cb5-a363-7ac7256783ea	{"sub": "ec130a1b-822f-4cb5-a363-7ac7256783ea", "email": "sdgwergsgw@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-09 10:00:37.249566+00	2026-06-09 10:00:37.249611+00	2026-06-09 10:00:37.249611+00	6e864b06-a2d5-4346-81fc-cebcd30807aa
248c8164-c286-423c-99a4-972d4ffc6c04	248c8164-c286-423c-99a4-972d4ffc6c04	{"sub": "248c8164-c286-423c-99a4-972d4ffc6c04", "email": "yann12@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-09 10:34:05.726082+00	2026-06-09 10:34:05.72613+00	2026-06-09 10:34:05.72613+00	12280178-1ecb-4556-b0a7-c3782937716e
d26d7109-aa21-4aff-be7a-52b094d294fa	d26d7109-aa21-4aff-be7a-52b094d294fa	{"sub": "d26d7109-aa21-4aff-be7a-52b094d294fa", "email": "yannseaklay2412@gmail.com", "email_verified": true, "phone_verified": false}	email	2026-06-09 06:33:45.78527+00	2026-06-09 06:33:45.785323+00	2026-06-09 06:33:45.785323+00	0eca16fc-b544-49df-9d2f-a7eaa8cf9b16
e62ef754-b15b-40cf-af7c-dace2c12e2b4	e62ef754-b15b-40cf-af7c-dace2c12e2b4	{"sub": "e62ef754-b15b-40cf-af7c-dace2c12e2b4", "email": "seaklay123@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-09 10:44:29.945399+00	2026-06-09 10:44:29.945453+00	2026-06-09 10:44:29.945453+00	3a2f709b-ceb2-454e-8c12-eb2f96c323de
ef15cee2-5a7f-446e-a8f3-3f0c01e80309	ef15cee2-5a7f-446e-a8f3-3f0c01e80309	{"sub": "ef15cee2-5a7f-446e-a8f3-3f0c01e80309", "email": "maisreynuth@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-09 12:51:05.072514+00	2026-06-09 12:51:05.072571+00	2026-06-09 12:51:05.072571+00	0e80f902-6f3b-4a90-862e-db184da1b418
ff9d87aa-2c0d-48b0-a72b-62081fd318f9	ff9d87aa-2c0d-48b0-a72b-62081fd318f9	{"sub": "ff9d87aa-2c0d-48b0-a72b-62081fd318f9", "email": "maisreynuth1@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-09 14:07:35.617162+00	2026-06-09 14:07:35.617205+00	2026-06-09 14:07:35.617205+00	17d583c5-569e-412f-bd57-e15d56d77e00
4c35709e-646b-4f8d-8555-5773898f638a	4c35709e-646b-4f8d-8555-5773898f638a	{"sub": "4c35709e-646b-4f8d-8555-5773898f638a", "email": "sreynuthmai8@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-15 02:28:22.860316+00	2026-06-15 02:28:22.860375+00	2026-06-15 02:28:22.860375+00	0181faf3-7e90-4205-8b6f-ed2bb0b72624
e9154374-cb36-40e7-9f3e-c19f685b779d	e9154374-cb36-40e7-9f3e-c19f685b779d	{"sub": "e9154374-cb36-40e7-9f3e-c19f685b779d", "email": "admin123@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-15 02:38:58.882827+00	2026-06-15 02:38:58.882877+00	2026-06-15 02:38:58.882877+00	9b300eed-b6fa-4d6a-a26e-f09dfb0d913d
72284bc0-d3d6-4cfe-8777-3c0485682cc3	72284bc0-d3d6-4cfe-8777-3c0485682cc3	{"sub": "72284bc0-d3d6-4cfe-8777-3c0485682cc3", "email": "lymeas9999@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-16 02:26:46.871861+00	2026-06-16 02:26:46.871932+00	2026-06-16 02:26:46.871932+00	36e452dd-3bd0-46c6-85bd-de5936227de3
e914c318-0ace-458b-92e3-f6d7fc9064bb	e914c318-0ace-458b-92e3-f6d7fc9064bb	{"sub": "e914c318-0ace-458b-92e3-f6d7fc9064bb", "email": "you123@gamil.com", "email_verified": false, "phone_verified": false}	email	2026-06-16 02:33:29.528711+00	2026-06-16 02:33:29.528767+00	2026-06-16 02:33:29.528767+00	62498966-c9b6-4564-aec4-5d2ec410674c
e220ec64-7b21-4af6-a7a8-93dd303893e9	e220ec64-7b21-4af6-a7a8-93dd303893e9	{"sub": "e220ec64-7b21-4af6-a7a8-93dd303893e9", "email": "nuthnuth@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-16 02:34:53.631357+00	2026-06-16 02:34:53.631405+00	2026-06-16 02:34:53.631405+00	50b66327-a9b5-4405-8113-f8efcc9a706b
fde5aff7-1517-470f-ad94-2b4ac5227f59	fde5aff7-1517-470f-ad94-2b4ac5227f59	{"sub": "fde5aff7-1517-470f-ad94-2b4ac5227f59", "email": "sreynuth@gmailcom", "email_verified": false, "phone_verified": false}	email	2026-06-16 02:36:16.259097+00	2026-06-16 02:36:16.259176+00	2026-06-16 02:36:16.259176+00	abb0ecce-89b7-40fa-b63c-aac842da28f0
36127943-0610-4290-b44c-d00e6c1d5e6e	36127943-0610-4290-b44c-d00e6c1d5e6e	{"sub": "36127943-0610-4290-b44c-d00e6c1d5e6e", "email": "nuth@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-16 04:04:14.819804+00	2026-06-16 04:04:14.81986+00	2026-06-16 04:04:14.81986+00	53865434-9336-469e-b67b-a8452079f9b3
8d0cf94b-46cf-4b20-b12b-6db4cffe065d	8d0cf94b-46cf-4b20-b12b-6db4cffe065d	{"sub": "8d0cf94b-46cf-4b20-b12b-6db4cffe065d", "email": "meas123@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-16 04:06:50.162635+00	2026-06-16 04:06:50.16268+00	2026-06-16 04:06:50.16268+00	04aa1b23-3de7-4287-9f6c-ad4b97435aac
77ef5472-90d7-42bc-9a61-4c9557055a8b	77ef5472-90d7-42bc-9a61-4c9557055a8b	{"sub": "77ef5472-90d7-42bc-9a61-4c9557055a8b", "email": "laie123@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-16 04:07:54.213748+00	2026-06-16 04:07:54.213798+00	2026-06-16 04:07:54.213798+00	a2cf499f-b515-4d6f-a20d-2ef503a044f2
162b1dd3-f73c-4575-ac70-02b17ae313cf	162b1dd3-f73c-4575-ac70-02b17ae313cf	{"sub": "162b1dd3-f73c-4575-ac70-02b17ae313cf", "email": "nith123@gmail", "email_verified": false, "phone_verified": false}	email	2026-06-16 04:16:07.485557+00	2026-06-16 04:16:07.485606+00	2026-06-16 04:16:07.485606+00	c4dbf1e0-323d-4b9a-bd0f-0763a2024de0
c78afe56-ceaf-4cb8-b9a1-127c29d2afe9	c78afe56-ceaf-4cb8-b9a1-127c29d2afe9	{"sub": "c78afe56-ceaf-4cb8-b9a1-127c29d2afe9", "email": "phavy@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-16 04:20:50.601291+00	2026-06-16 04:20:50.601349+00	2026-06-16 04:20:50.601349+00	87fa75bc-0aa0-44d8-b362-ab7b194b8681
4d20d06b-4dad-4904-942b-ea9d698a6c19	4d20d06b-4dad-4904-942b-ea9d698a6c19	{"sub": "4d20d06b-4dad-4904-942b-ea9d698a6c19", "email": "maisreynuth7@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-16 04:22:18.402614+00	2026-06-16 04:22:18.402672+00	2026-06-16 04:22:18.402672+00	261f917a-910d-4d44-a3f5-88a5747d215e
b61f5568-3903-4ef4-87ac-b0d16ab484a9	b61f5568-3903-4ef4-87ac-b0d16ab484a9	{"sub": "b61f5568-3903-4ef4-87ac-b0d16ab484a9", "email": "lay@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-17 05:06:04.870656+00	2026-06-17 05:06:04.870731+00	2026-06-17 05:06:04.870731+00	09aac36c-850c-43ae-90c0-21a176e63bf9
270b1b52-5aef-4e8b-9bc8-60b49bcc6d06	270b1b52-5aef-4e8b-9bc8-60b49bcc6d06	{"sub": "270b1b52-5aef-4e8b-9bc8-60b49bcc6d06", "email": "jeus_holy_water@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-19 07:38:31.133314+00	2026-06-19 07:38:31.133366+00	2026-06-19 07:38:31.133366+00	fc6f918c-4654-4029-9453-bcd707808e91
365dec6d-e007-4bde-a127-c5a0dee2fb32	365dec6d-e007-4bde-a127-c5a0dee2fb32	{"sub": "365dec6d-e007-4bde-a127-c5a0dee2fb32", "email": "yannseaklay253213@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-25 13:22:12.235375+00	2026-06-25 13:22:12.235436+00	2026-06-25 13:22:12.235436+00	43fcdb78-1c41-49c0-a8fc-4a046b51efcf
8475af18-b5d5-49ff-bf73-a174246fe315	8475af18-b5d5-49ff-bf73-a174246fe315	{"sub": "8475af18-b5d5-49ff-bf73-a174246fe315", "email": "lymeas@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-26 03:52:40.374786+00	2026-06-26 03:52:40.374836+00	2026-06-26 03:52:40.374836+00	926e7e6c-7a3b-4d63-9a88-38ba8dd1da6f
c4015fc3-85e6-42f2-a2d4-6eac75ddc45e	c4015fc3-85e6-42f2-a2d4-6eac75ddc45e	{"sub": "c4015fc3-85e6-42f2-a2d4-6eac75ddc45e", "email": "xingrover85@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-26 17:20:11.565566+00	2026-06-26 17:20:11.565617+00	2026-06-26 17:20:11.565617+00	748354b8-5dba-4e71-88ed-44ca92940449
8b04af03-0c89-4449-8935-f3f133df0c36	8b04af03-0c89-4449-8935-f3f133df0c36	{"sub": "8b04af03-0c89-4449-8935-f3f133df0c36", "email": "yannlaie741@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-06-28 10:49:13.758013+00	2026-06-28 10:49:13.758061+00	2026-06-28 10:49:13.758061+00	7df301d5-48da-4651-a606-79fba5d45d1a
9934c511-6f5f-490a-a0cc-6fb9bb930212	9934c511-6f5f-490a-a0cc-6fb9bb930212	{"sub": "9934c511-6f5f-490a-a0cc-6fb9bb930212", "email": "test@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-07-03 02:54:07.119377+00	2026-07-03 02:54:07.119444+00	2026-07-03 02:54:07.119444+00	d2d49782-fd4d-46cf-8966-253f6a9f069a
b856b203-3021-4054-82eb-b53810a5c4d4	b856b203-3021-4054-82eb-b53810a5c4d4	{"sub": "b856b203-3021-4054-82eb-b53810a5c4d4", "email": "maisreynuth8@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-07-03 03:14:21.465379+00	2026-07-03 03:14:21.465432+00	2026-07-03 03:14:21.465432+00	e4d68348-0e1a-46e3-9244-bb70eb167a28
e38b31ce-3d9d-46f4-8b5d-54dd42ed1038	e38b31ce-3d9d-46f4-8b5d-54dd42ed1038	{"sub": "e38b31ce-3d9d-46f4-8b5d-54dd42ed1038", "email": "sreynuthmai@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-07-08 16:32:27.514336+00	2026-07-08 16:32:27.514385+00	2026-07-08 16:32:27.514385+00	6d15a2f1-fc26-4884-ae73-85d69dac479b
f45a17dd-10d5-49e8-8fc6-53e15f3a9950	f45a17dd-10d5-49e8-8fc6-53e15f3a9950	{"sub": "f45a17dd-10d5-49e8-8fc6-53e15f3a9950", "email": "kimhuoyyann@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-07-09 16:17:07.559641+00	2026-07-09 16:17:07.559692+00	2026-07-09 16:17:07.559692+00	bae87a99-be06-49d9-836c-844a78079be9
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_clients" ("id", "client_secret_hash", "registration_type", "redirect_uris", "grant_types", "client_name", "client_uri", "logo_uri", "created_at", "updated_at", "deleted_at", "client_type", "token_endpoint_auth_method") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") FROM stdin;
a1ee19ba-0383-4427-991c-f100b93722cd	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-28 16:51:59.153511+00	2026-06-28 16:51:59.153511+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	175.100.10.86	\N	\N	\N	\N	\N
25ec9004-deeb-4676-8bb6-b2503bf20530	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-28 17:34:10.142697+00	2026-06-28 17:34:10.142697+00	\N	aal1	\N	\N	node	74.220.48.20	\N	\N	\N	\N	\N
6e4c7b66-f323-4bb2-bf20-fdf962d85ab9	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 13:08:33.92801+00	2026-07-05 14:33:41.25564+00	\N	aal1	\N	2026-07-05 14:33:41.255529	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.98	\N	\N	\N	\N	\N
633ebd72-b479-48ab-a5fd-4cbac45cae75	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-03 03:37:57.782367+00	2026-07-10 03:27:01.48884+00	\N	aal1	\N	2026-07-10 03:27:01.488753	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36 Edg/150.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
cd60c8af-8e3b-4b98-8c2f-3a6eef504dcf	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-01 16:50:14.102608+00	2026-07-01 16:50:14.102608+00	\N	aal1	\N	\N	node	36.37.197.234	\N	\N	\N	\N	\N
6346d41a-7d8e-49b9-a7d6-d613d7775572	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-30 06:01:24.757702+00	2026-06-30 06:01:24.757702+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
4cadf6c6-c86c-4262-92ee-bf6315b1a025	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-30 06:01:26.516629+00	2026-06-30 06:01:26.516629+00	\N	aal1	\N	\N	node	203.95.199.47	\N	\N	\N	\N	\N
01d7ff3c-4caa-4dd4-b799-78cb20fca589	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-01 16:50:12.748686+00	2026-07-02 17:20:04.40466+00	\N	aal1	\N	2026-07-02 17:20:04.404565	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	36.37.197.0	\N	\N	\N	\N	\N
1025e981-5bce-4581-ad5b-f38b9f1f3e3e	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-30 06:58:09.610003+00	2026-06-30 06:58:09.610003+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	37.19.205.215	\N	\N	\N	\N	\N
3c6dacb7-8bed-4d52-9a92-b64554755a59	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:42:29.706886+00	2026-07-05 15:42:29.706886+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.98	\N	\N	\N	\N	\N
65fbec68-fe99-4149-afef-0957180d2c67	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-03 03:15:29.209845+00	2026-07-03 03:15:29.209845+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
dcdeb605-99ab-4d42-82fc-c9e025f40579	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-08 16:49:01.396057+00	2026-07-08 16:49:01.396057+00	\N	aal1	\N	\N	node	74.220.48.20	\N	\N	\N	\N	\N
7e765d79-5cf9-4996-8405-caf1dc3a3874	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-03 03:15:30.237254+00	2026-07-03 03:15:30.237254+00	\N	aal1	\N	\N	node	203.95.199.47	\N	\N	\N	\N	\N
6dac8024-0855-43be-b98c-0590f7fa3252	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-03 02:53:29.763857+00	2026-07-03 02:53:29.763857+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
129cb44d-860d-454e-862f-30a0daa19c4c	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-03 02:53:30.814561+00	2026-07-03 02:53:30.814561+00	\N	aal1	\N	\N	node	203.95.199.47	\N	\N	\N	\N	\N
1f147af7-a3fd-496f-82d9-a17095c7dd75	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-28 17:34:08.615711+00	2026-07-09 16:38:29.403854+00	\N	aal1	\N	2026-07-09 16:38:29.400411	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.149	\N	\N	\N	\N	\N
f5da792a-324c-42d7-bc02-91ba193c08b1	e38b31ce-3d9d-46f4-8b5d-54dd42ed1038	2026-07-10 17:14:46.758455+00	2026-07-10 17:14:46.758455+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	36.37.222.14	\N	\N	\N	\N	\N
e988d44f-ba3e-4d39-98f4-140e7bc2d6fa	e220ec64-7b21-4af6-a7a8-93dd303893e9	2026-06-16 02:34:53.640972+00	2026-06-16 02:34:53.640972+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
c2aeb458-7f81-4cef-bc2a-ad7ff6102014	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-08 16:48:59.598503+00	2026-07-10 16:58:56.714992+00	\N	aal1	\N	2026-07-10 16:58:56.714838	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36 Edg/150.0.0.0	36.37.222.14	\N	\N	\N	\N	\N
5f7332f9-d437-4756-bb8c-0fc8b7afac3f	e220ec64-7b21-4af6-a7a8-93dd303893e9	2026-06-16 02:35:05.203029+00	2026-06-16 02:35:05.203029+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
a7173470-9222-483a-bccd-05469d073ca9	e220ec64-7b21-4af6-a7a8-93dd303893e9	2026-06-16 02:35:24.200711+00	2026-06-16 02:35:24.200711+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
87666906-7aa3-44ed-8df3-f7cd304710bc	fde5aff7-1517-470f-ad94-2b4ac5227f59	2026-06-16 02:36:16.265156+00	2026-06-16 02:36:16.265156+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
b4ee47e6-58b3-40c1-8eb0-05bc6ab6380b	e38b31ce-3d9d-46f4-8b5d-54dd42ed1038	2026-07-10 17:14:48.778532+00	2026-07-10 17:14:48.778532+00	\N	aal1	\N	\N	node	36.37.222.14	\N	\N	\N	\N	\N
522f476f-cce8-4a54-8e02-a48e7d63a97c	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-03 03:37:58.617622+00	2026-07-03 03:37:58.617622+00	\N	aal1	\N	\N	node	203.95.199.47	\N	\N	\N	\N	\N
423000fe-d68b-4311-b70c-7196285fb51e	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-04 18:14:58.445513+00	2026-07-04 18:14:58.445513+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.103	\N	\N	\N	\N	\N
b5fb49a3-4226-423f-97b2-c6ffc6b72adf	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-11 04:26:05.1065+00	2026-07-11 04:26:05.1065+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.112	\N	\N	\N	\N	\N
089b9e62-9a58-46da-a53d-25ae0401560d	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 07:55:45.765442+00	2026-07-05 07:55:45.765442+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36	45.119.135.17	\N	\N	\N	\N	\N
8243beab-694e-44b0-af50-9c3b7d8ae8cb	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 07:55:51.360398+00	2026-07-05 07:55:51.360398+00	\N	aal1	\N	\N	node	74.220.48.20	\N	\N	\N	\N	\N
71348eb2-dc27-41bc-936d-19741a489610	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 10:30:36.555354+00	2026-07-05 12:27:24.981922+00	\N	aal1	\N	2026-07-05 12:27:24.981799	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.98	\N	\N	\N	\N	\N
ca8b2374-980a-4fa0-b716-d06930ff24fa	36127943-0610-4290-b44c-d00e6c1d5e6e	2026-06-16 04:04:14.832182+00	2026-06-16 04:04:14.832182+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
5f6505f0-3567-4d81-8ba9-f116b25e1d04	77ef5472-90d7-42bc-9a61-4c9557055a8b	2026-06-16 04:07:54.228288+00	2026-06-16 04:07:54.228288+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
fa2b17c8-037e-4fbb-8f6d-e0436068ff2c	77ef5472-90d7-42bc-9a61-4c9557055a8b	2026-06-16 04:08:04.569648+00	2026-06-16 04:08:04.569648+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
3f5381f4-7265-4dee-bdf1-9c266de00be8	77ef5472-90d7-42bc-9a61-4c9557055a8b	2026-06-16 04:08:05.105048+00	2026-06-16 04:08:05.105048+00	\N	aal1	\N	\N	node	203.95.199.47	\N	\N	\N	\N	\N
a061885a-c4a2-4aa9-8c64-c20b902de36a	77ef5472-90d7-42bc-9a61-4c9557055a8b	2026-06-16 04:16:55.261481+00	2026-06-16 04:16:55.261481+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
9eb02b12-3c64-4316-9f4b-2c1f47e4a7f4	77ef5472-90d7-42bc-9a61-4c9557055a8b	2026-06-16 04:16:55.776636+00	2026-06-16 04:16:55.776636+00	\N	aal1	\N	\N	node	203.95.199.47	\N	\N	\N	\N	\N
994a658b-e972-4fab-8be8-733fbb67fd6c	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-28 16:55:27.117376+00	2026-06-28 16:55:27.117376+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	175.100.10.86	\N	\N	\N	\N	\N
570148c3-c57f-4ef7-81b7-ad3fb50699f3	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-29 06:57:12.354469+00	2026-06-29 06:57:12.354469+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	175.100.10.86	\N	\N	\N	\N	\N
4d51f4be-b750-4bae-b62c-07d90516babd	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-29 06:57:14.554061+00	2026-06-29 06:57:14.554061+00	\N	aal1	\N	\N	node	74.220.48.20	\N	\N	\N	\N	\N
c723486c-31b3-464a-99ce-5e7e5516c29f	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-28 16:38:59.033864+00	2026-06-29 07:04:28.552026+00	\N	aal1	\N	2026-06-29 07:04:28.551902	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	175.100.10.86	\N	\N	\N	\N	\N
b6b490e9-4fbc-4af8-b6f8-1b4eac55f8b5	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:14:37.840434+00	2026-07-05 15:14:37.840434+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.98	\N	\N	\N	\N	\N
5d3f16ce-b3fd-45c2-8094-2ba7e14005a6	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:21:11.485782+00	2026-07-05 15:21:11.485782+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.98	\N	\N	\N	\N	\N
c0894d43-0acd-4f4b-b0b9-b7483ff440b1	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:32:30.431436+00	2026-07-05 15:32:30.431436+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.98	\N	\N	\N	\N	\N
b2323879-624e-41fd-8d68-8e2b91dbcb8d	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-03 02:38:20.293835+00	2026-07-04 17:25:47.181747+00	\N	aal1	\N	2026-07-04 17:25:47.181646	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.103	\N	\N	\N	\N	\N
d5051427-9ca3-4037-8332-7ffa5c08eafe	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-30 07:19:36.624707+00	2026-07-02 15:47:17.31383+00	\N	aal1	\N	2026-07-02 15:47:17.313724	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	175.100.10.139	\N	\N	\N	\N	\N
3fb962f5-144d-44cc-998f-7af1d31745a0	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 07:03:01.790276+00	2026-07-05 09:19:42.748847+00	\N	aal1	\N	2026-07-05 09:19:42.748737	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.98	\N	\N	\N	\N	\N
72245f6d-894c-4f7b-b202-43f8bf3c5416	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-02 15:49:55.72505+00	2026-07-03 01:40:30.825671+00	\N	aal1	\N	2026-07-03 01:40:30.82556	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	203.95.199.47	\N	\N	\N	\N	\N
d27f1eae-2d52-4e18-a465-e9f448163e9b	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-09 14:46:03.132045+00	2026-07-09 16:21:52.979618+00	\N	aal1	\N	2026-07-09 16:21:52.979513	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.149	\N	\N	\N	\N	\N
dd976fee-f6c7-4403-b138-1a50c468903a	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-03 02:20:40.770085+00	2026-07-03 02:20:40.770085+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	203.95.199.47	\N	\N	\N	\N	\N
27b1295d-c18d-4c56-a876-edf369ac7393	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-03 02:20:41.606192+00	2026-07-03 02:20:41.606192+00	\N	aal1	\N	\N	node	203.95.199.47	\N	\N	\N	\N	\N
463153ee-a9b6-47bb-83da-899581f6adbf	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-10 03:19:10.565339+00	2026-07-10 03:19:10.565339+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	203.95.199.47	\N	\N	\N	\N	\N
1865d8aa-05a8-439d-bc72-b1d3215a7382	d26d7109-aa21-4aff-be7a-52b094d294fa	2026-07-11 04:42:40.252514+00	2026-07-11 07:54:51.254092+00	\N	aal1	\N	2026-07-11 07:54:51.25399	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	175.100.10.112	\N	\N	\N	\N	\N
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
01d7ff3c-4caa-4dd4-b799-78cb20fca589	2026-07-01 16:50:12.752126+00	2026-07-01 16:50:12.752126+00	password	af529682-0072-4c7f-8df6-ba6386470e74
cd60c8af-8e3b-4b98-8c2f-3a6eef504dcf	2026-07-01 16:50:14.105083+00	2026-07-01 16:50:14.105083+00	password	d69f19b6-48b6-41f8-93d2-6394a2dbb460
72245f6d-894c-4f7b-b202-43f8bf3c5416	2026-07-02 15:49:55.760303+00	2026-07-02 15:49:55.760303+00	password	011438e9-fd92-48fd-b9c1-7d8c861cd80c
dd976fee-f6c7-4403-b138-1a50c468903a	2026-07-03 02:20:40.772705+00	2026-07-03 02:20:40.772705+00	password	c7c75427-7e1d-4c0c-86c7-6831f8410249
27b1295d-c18d-4c56-a876-edf369ac7393	2026-07-03 02:20:41.608621+00	2026-07-03 02:20:41.608621+00	password	0d4a5f38-da72-4530-b1a5-4dbd73c64a70
463153ee-a9b6-47bb-83da-899581f6adbf	2026-07-10 03:19:10.579757+00	2026-07-10 03:19:10.579757+00	password	7fc26700-ce05-4189-b7ed-4c49c823706f
b2323879-624e-41fd-8d68-8e2b91dbcb8d	2026-07-03 02:38:20.316443+00	2026-07-03 02:38:20.316443+00	password	353339dc-0499-4c54-b705-e7cf0a4fdcf7
f5da792a-324c-42d7-bc02-91ba193c08b1	2026-07-10 17:14:46.80143+00	2026-07-10 17:14:46.80143+00	password	0cedc68a-380f-4ddd-80ee-038ae7e566c5
b4ee47e6-58b3-40c1-8eb0-05bc6ab6380b	2026-07-10 17:14:48.781245+00	2026-07-10 17:14:48.781245+00	password	7c2588e2-4903-47fe-bed6-9fff2e609340
b5fb49a3-4226-423f-97b2-c6ffc6b72adf	2026-07-11 04:26:05.134295+00	2026-07-11 04:26:05.134295+00	password	6c0a5540-f8f5-4e4e-b308-0e60ab07cbc9
6dac8024-0855-43be-b98c-0590f7fa3252	2026-07-03 02:53:29.791468+00	2026-07-03 02:53:29.791468+00	password	fe059182-c692-4cb7-97bb-4fd6bc820c42
129cb44d-860d-454e-862f-30a0daa19c4c	2026-07-03 02:53:30.817412+00	2026-07-03 02:53:30.817412+00	password	d0270b87-2159-4e9a-9401-7f1b999be395
1865d8aa-05a8-439d-bc72-b1d3215a7382	2026-07-11 04:42:40.290951+00	2026-07-11 04:42:40.290951+00	password	0c8b02a4-001c-49e7-8541-79acafb4010f
e988d44f-ba3e-4d39-98f4-140e7bc2d6fa	2026-06-16 02:34:53.644927+00	2026-06-16 02:34:53.644927+00	password	3a084e83-597f-4251-b0ee-cf4de97e0ac4
5f7332f9-d437-4756-bb8c-0fc8b7afac3f	2026-06-16 02:35:05.205491+00	2026-06-16 02:35:05.205491+00	password	c1f3e503-f8c1-43f8-a212-e5231eeca726
a7173470-9222-483a-bccd-05469d073ca9	2026-06-16 02:35:24.203266+00	2026-06-16 02:35:24.203266+00	password	19cd4231-287f-4a45-89fc-10ecce2a61a2
87666906-7aa3-44ed-8df3-f7cd304710bc	2026-06-16 02:36:16.267472+00	2026-06-16 02:36:16.267472+00	password	e2997d61-e266-4040-a0a3-7d4408a9b641
c723486c-31b3-464a-99ce-5e7e5516c29f	2026-06-28 16:38:59.04808+00	2026-06-28 16:38:59.04808+00	password	757c2bdf-b7af-46a2-a8fd-4cdba31d9a32
65fbec68-fe99-4149-afef-0957180d2c67	2026-07-03 03:15:29.256097+00	2026-07-03 03:15:29.256097+00	password	df2c58c1-2a91-4931-82c9-1fd5dcd7f930
a1ee19ba-0383-4427-991c-f100b93722cd	2026-06-28 16:51:59.174994+00	2026-06-28 16:51:59.174994+00	password	4157ec56-934a-4881-a52f-df997a9c755c
994a658b-e972-4fab-8be8-733fbb67fd6c	2026-06-28 16:55:27.133056+00	2026-06-28 16:55:27.133056+00	password	734d8c47-5898-4a73-8b3c-65de908a3b4e
1f147af7-a3fd-496f-82d9-a17095c7dd75	2026-06-28 17:34:08.676001+00	2026-06-28 17:34:08.676001+00	password	1455327f-b490-4eef-858a-90964b9b87c0
7e765d79-5cf9-4996-8405-caf1dc3a3874	2026-07-03 03:15:30.240052+00	2026-07-03 03:15:30.240052+00	password	893d403a-e90e-4885-898d-1258d9ce8931
25ec9004-deeb-4676-8bb6-b2503bf20530	2026-06-28 17:34:10.151228+00	2026-06-28 17:34:10.151228+00	password	333ac24f-cef9-41c3-8621-ca56d397d30b
ca8b2374-980a-4fa0-b716-d06930ff24fa	2026-06-16 04:04:14.837186+00	2026-06-16 04:04:14.837186+00	password	2ecbadf9-534c-4fe7-a1a0-b8265bd15a2c
570148c3-c57f-4ef7-81b7-ad3fb50699f3	2026-06-29 06:57:12.434819+00	2026-06-29 06:57:12.434819+00	password	62f0025c-285e-4f30-a776-be6ab0bd439f
4d51f4be-b750-4bae-b62c-07d90516babd	2026-06-29 06:57:14.55785+00	2026-06-29 06:57:14.55785+00	password	8fd4745d-09a9-428a-90f4-943c7e2648bc
633ebd72-b479-48ab-a5fd-4cbac45cae75	2026-07-03 03:37:57.796472+00	2026-07-03 03:37:57.796472+00	password	8cc41df6-8684-4805-ac92-404d3a05de21
522f476f-cce8-4a54-8e02-a48e7d63a97c	2026-07-03 03:37:58.620092+00	2026-07-03 03:37:58.620092+00	password	cb7f0de8-d7bb-4af3-b1b1-1ee60fd767f6
5f6505f0-3567-4d81-8ba9-f116b25e1d04	2026-06-16 04:07:54.231565+00	2026-06-16 04:07:54.231565+00	password	3e016b86-1cf8-470b-a8a8-591564b56338
fa2b17c8-037e-4fbb-8f6d-e0436068ff2c	2026-06-16 04:08:04.5749+00	2026-06-16 04:08:04.5749+00	password	4f8ffd5c-e29f-47a4-b9ef-b909cccdcae6
3f5381f4-7265-4dee-bdf1-9c266de00be8	2026-06-16 04:08:05.107608+00	2026-06-16 04:08:05.107608+00	password	a9b4925a-4578-4072-8e63-8428a31d48d5
423000fe-d68b-4311-b70c-7196285fb51e	2026-07-04 18:14:58.463291+00	2026-07-04 18:14:58.463291+00	password	e04d78ed-bd60-4ebc-a370-cae9b03d6fcf
6346d41a-7d8e-49b9-a7d6-d613d7775572	2026-06-30 06:01:24.803426+00	2026-06-30 06:01:24.803426+00	password	bae19b23-e254-421f-b2cc-9178a0e47945
a061885a-c4a2-4aa9-8c64-c20b902de36a	2026-06-16 04:16:55.264178+00	2026-06-16 04:16:55.264178+00	password	cfc3a412-5436-4dbe-8683-7ef0a203f470
9eb02b12-3c64-4316-9f4b-2c1f47e4a7f4	2026-06-16 04:16:55.778997+00	2026-06-16 04:16:55.778997+00	password	aaeea668-cfe2-42cc-bccb-b2ac0ca87dac
4cadf6c6-c86c-4262-92ee-bf6315b1a025	2026-06-30 06:01:26.520654+00	2026-06-30 06:01:26.520654+00	password	516a3589-7025-4319-86fb-75e85ed08a96
3fb962f5-144d-44cc-998f-7af1d31745a0	2026-07-05 07:03:01.849848+00	2026-07-05 07:03:01.849848+00	password	2a9408d9-de97-4f0d-92ac-60f9797c0e36
089b9e62-9a58-46da-a53d-25ae0401560d	2026-07-05 07:55:45.834747+00	2026-07-05 07:55:45.834747+00	password	78825da5-182a-4c48-a584-fc809ab22bf1
8243beab-694e-44b0-af50-9c3b7d8ae8cb	2026-07-05 07:55:51.366918+00	2026-07-05 07:55:51.366918+00	password	84312103-9e4f-4187-bad4-c9ac23de8ab7
1025e981-5bce-4581-ad5b-f38b9f1f3e3e	2026-06-30 06:58:09.625967+00	2026-06-30 06:58:09.625967+00	password	1e60e0fb-711c-4039-bfce-0fd1f22f82e8
d5051427-9ca3-4037-8332-7ffa5c08eafe	2026-06-30 07:19:36.642772+00	2026-06-30 07:19:36.642772+00	password	07cb201b-5e42-48d5-89f3-805f7c67b0ed
71348eb2-dc27-41bc-936d-19741a489610	2026-07-05 10:30:36.59728+00	2026-07-05 10:30:36.59728+00	password	20080826-3028-4e42-b9cc-223437807a00
6e4c7b66-f323-4bb2-bf20-fdf962d85ab9	2026-07-05 13:08:33.950119+00	2026-07-05 13:08:33.950119+00	password	91dea832-84d3-4bfd-813a-2fb3d5cf8a9b
b6b490e9-4fbc-4af8-b6f8-1b4eac55f8b5	2026-07-05 15:14:37.863471+00	2026-07-05 15:14:37.863471+00	password	1d3778db-fccd-473a-a1d1-5e95f0f32ceb
5d3f16ce-b3fd-45c2-8094-2ba7e14005a6	2026-07-05 15:21:11.539965+00	2026-07-05 15:21:11.539965+00	password	62d2efe7-62c7-4b93-8492-83ff82e0a0f4
c0894d43-0acd-4f4b-b0b9-b7483ff440b1	2026-07-05 15:32:30.462694+00	2026-07-05 15:32:30.462694+00	password	55159cca-df43-4ab9-b83d-23929fe7f945
3c6dacb7-8bed-4d52-9a92-b64554755a59	2026-07-05 15:42:29.742448+00	2026-07-05 15:42:29.742448+00	password	41ce58fd-4317-4465-a156-a264ccc8a432
c2aeb458-7f81-4cef-bc2a-ad7ff6102014	2026-07-08 16:48:59.616256+00	2026-07-08 16:48:59.616256+00	password	0f90d756-7da0-48e3-93f9-d39a68fc45e7
dcdeb605-99ab-4d42-82fc-c9e025f40579	2026-07-08 16:49:01.400406+00	2026-07-08 16:49:01.400406+00	password	48b1498a-043c-481e-90e5-34c63afeb150
d27f1eae-2d52-4e18-a465-e9f448163e9b	2026-07-09 14:46:03.153292+00	2026-07-09 14:46:03.153292+00	password	051c2485-d49f-499e-b123-0c4b97e20cd1
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid", "last_webauthn_challenge_data") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_authorizations" ("id", "authorization_id", "client_id", "user_id", "redirect_uri", "scope", "state", "resource", "code_challenge", "code_challenge_method", "response_type", "status", "authorization_code", "created_at", "expires_at", "approved_at", "nonce") FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_client_states" ("id", "provider_type", "code_verifier", "created_at") FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_consents" ("id", "user_id", "client_id", "scopes", "granted_at", "revoked_at") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") FROM stdin;
29eaba53-71b0-4d8a-b3d6-cc09789cf1b4	a5a27b83-c446-4c4c-a2f5-2e7cd94f8467	confirmation_token	3d88560e4f57e0dca7331090ff49daeb4027ea002bda58ce61534abd	yannseaklay123@gmail.com	2026-06-09 07:51:52.139648	2026-06-09 07:51:52.139648
df0efb55-a9b9-4a79-bedd-d531ee1b0ad3	4d19b920-e211-4536-a988-3aa9903067cb	confirmation_token	b352fa957dcc15f08a65bb1ce5c58f325d6398960cc31998e0018489	yannlaie123@gmail.com	2026-06-09 09:25:37.511611	2026-06-09 09:25:37.511611
acdfab11-dfe2-4919-bb49-638fa65e4d1d	8ae26299-1ad0-42de-b05f-ed17dabf6081	confirmation_token	b3f86ab2b8f038f86eb3825fcd904c2ff97f4875474d15b1b804bab4	yannlaie12@gmail.com	2026-06-09 09:40:29.446988	2026-06-09 09:40:29.446988
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
00000000-0000-0000-0000-000000000000	612	pkcdbwldyp4n	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-10 03:19:10.57371+00	2026-07-10 03:19:10.57371+00	\N	463153ee-a9b6-47bb-83da-899581f6adbf
00000000-0000-0000-0000-000000000000	614	ru3i45mag2cd	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-10 03:27:01.479441+00	2026-07-10 03:27:01.479441+00	yetciveqfkgb	633ebd72-b479-48ab-a5fd-4cbac45cae75
00000000-0000-0000-0000-000000000000	593	g3tj7q75vcbv	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-08 16:48:59.60709+00	2026-07-10 16:58:56.687779+00	\N	c2aeb458-7f81-4cef-bc2a-ad7ff6102014
00000000-0000-0000-0000-000000000000	621	rpxrermysim4	e38b31ce-3d9d-46f4-8b5d-54dd42ed1038	f	2026-07-10 17:14:46.792728+00	2026-07-10 17:14:46.792728+00	\N	f5da792a-324c-42d7-bc02-91ba193c08b1
00000000-0000-0000-0000-000000000000	622	sozek2xol43m	e38b31ce-3d9d-46f4-8b5d-54dd42ed1038	f	2026-07-10 17:14:48.779757+00	2026-07-10 17:14:48.779757+00	\N	b4ee47e6-58b3-40c1-8eb0-05bc6ab6380b
00000000-0000-0000-0000-000000000000	551	vr5q4rjplncg	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-03 14:04:48.748129+00	2026-07-04 06:12:37.676154+00	5ygbwsup7bwk	b2323879-624e-41fd-8d68-8e2b91dbcb8d
00000000-0000-0000-0000-000000000000	553	6bzjq66mqsmb	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-04 17:25:47.159958+00	2026-07-04 17:25:47.159958+00	blwfhcd65ya3	b2323879-624e-41fd-8d68-8e2b91dbcb8d
00000000-0000-0000-0000-000000000000	555	s2vjzc3kmtqy	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-04 18:14:58.457064+00	2026-07-04 18:14:58.457064+00	\N	423000fe-d68b-4311-b70c-7196285fb51e
00000000-0000-0000-0000-000000000000	558	fwwpj7g33myf	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-05 07:55:45.797372+00	2026-07-05 07:55:45.797372+00	\N	089b9e62-9a58-46da-a53d-25ae0401560d
00000000-0000-0000-0000-000000000000	559	qye3awr2hpre	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-05 07:55:51.365608+00	2026-07-05 07:55:51.365608+00	\N	8243beab-694e-44b0-af50-9c3b7d8ae8cb
00000000-0000-0000-0000-000000000000	499	ropztxqozln6	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-01 16:50:14.103676+00	2026-07-01 16:50:14.103676+00	\N	cd60c8af-8e3b-4b98-8c2f-3a6eef504dcf
00000000-0000-0000-0000-000000000000	563	apnq7of2trc3	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-05 09:19:42.733049+00	2026-07-05 09:19:42.733049+00	4tquscpbntdu	3fb962f5-144d-44cc-998f-7af1d31745a0
00000000-0000-0000-0000-000000000000	491	c7bztvjurf4y	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-06-30 08:18:06.706926+00	2026-07-02 15:47:17.270158+00	lfy6lo6ikhhc	d5051427-9ca3-4037-8332-7ffa5c08eafe
00000000-0000-0000-0000-000000000000	123	iwvp6xuzhjzk	e220ec64-7b21-4af6-a7a8-93dd303893e9	f	2026-06-16 02:34:53.642628+00	2026-06-16 02:34:53.642628+00	\N	e988d44f-ba3e-4d39-98f4-140e7bc2d6fa
00000000-0000-0000-0000-000000000000	626	glmflb2qsifj	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-11 04:26:05.123946+00	2026-07-11 04:26:05.123946+00	\N	b5fb49a3-4226-423f-97b2-c6ffc6b72adf
00000000-0000-0000-0000-000000000000	565	qjzns4v5antq	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-05 10:30:36.573587+00	2026-07-05 11:29:00.796874+00	\N	71348eb2-dc27-41bc-936d-19741a489610
00000000-0000-0000-0000-000000000000	126	hpybjxfhxtf3	e220ec64-7b21-4af6-a7a8-93dd303893e9	f	2026-06-16 02:35:05.20418+00	2026-06-16 02:35:05.20418+00	\N	5f7332f9-d437-4756-bb8c-0fc8b7afac3f
00000000-0000-0000-0000-000000000000	127	uwi7y5eddubq	e220ec64-7b21-4af6-a7a8-93dd303893e9	f	2026-06-16 02:35:24.201878+00	2026-06-16 02:35:24.201878+00	\N	a7173470-9222-483a-bccd-05469d073ca9
00000000-0000-0000-0000-000000000000	128	bhta5luzqmvb	fde5aff7-1517-470f-ad94-2b4ac5227f59	f	2026-06-16 02:36:16.266142+00	2026-06-16 02:36:16.266142+00	\N	87666906-7aa3-44ed-8df3-f7cd304710bc
00000000-0000-0000-0000-000000000000	501	croktoincr2u	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-02 15:49:55.744035+00	2026-07-02 17:16:46.611216+00	\N	72245f6d-894c-4f7b-b202-43f8bf3c5416
00000000-0000-0000-0000-000000000000	567	43mhj7zmkrfx	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-05 12:27:24.962479+00	2026-07-05 12:27:24.962479+00	mc6t4idjf76z	71348eb2-dc27-41bc-936d-19741a489610
00000000-0000-0000-0000-000000000000	498	noxmvudxd373	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-01 16:50:12.750584+00	2026-07-02 17:20:04.400851+00	\N	01d7ff3c-4caa-4dd4-b799-78cb20fca589
00000000-0000-0000-0000-000000000000	569	shmsbmfotmiz	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-05 13:08:33.94377+00	2026-07-05 14:33:41.212588+00	\N	6e4c7b66-f323-4bb2-bf20-fdf962d85ab9
00000000-0000-0000-0000-000000000000	504	mdm75hvpqdvg	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-02 17:20:04.40123+00	2026-07-02 17:20:04.40123+00	noxmvudxd373	01d7ff3c-4caa-4dd4-b799-78cb20fca589
00000000-0000-0000-0000-000000000000	628	wxha3aab2i56	d26d7109-aa21-4aff-be7a-52b094d294fa	t	2026-07-11 05:40:58.230496+00	2026-07-11 06:55:16.606491+00	jl66bax6fpdq	1865d8aa-05a8-439d-bc72-b1d3215a7382
00000000-0000-0000-0000-000000000000	507	5s3tulxq4eda	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-03 01:40:30.801724+00	2026-07-03 01:40:30.801724+00	gnq7dmc7fdto	72245f6d-894c-4f7b-b202-43f8bf3c5416
00000000-0000-0000-0000-000000000000	630	hyv4bd3hgsww	d26d7109-aa21-4aff-be7a-52b094d294fa	f	2026-07-11 07:54:51.241772+00	2026-07-11 07:54:51.241772+00	xjvfhwl2dlef	1865d8aa-05a8-439d-bc72-b1d3215a7382
00000000-0000-0000-0000-000000000000	578	rmoepempw62s	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-05 15:42:29.730995+00	2026-07-05 15:42:29.730995+00	\N	3c6dacb7-8bed-4d52-9a92-b64554755a59
00000000-0000-0000-0000-000000000000	466	amdo3x6kdqcc	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-06-28 16:51:59.169161+00	2026-06-28 16:51:59.169161+00	\N	a1ee19ba-0383-4427-991c-f100b93722cd
00000000-0000-0000-0000-000000000000	144	xqecegjtaykr	36127943-0610-4290-b44c-d00e6c1d5e6e	f	2026-06-16 04:04:14.834224+00	2026-06-16 04:04:14.834224+00	\N	ca8b2374-980a-4fa0-b716-d06930ff24fa
00000000-0000-0000-0000-000000000000	469	5iisetgy2e4s	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-06-28 17:34:10.148781+00	2026-06-28 17:34:10.148781+00	\N	25ec9004-deeb-4676-8bb6-b2503bf20530
00000000-0000-0000-0000-000000000000	468	2wntofjmmmdc	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-06-28 17:34:08.643768+00	2026-06-29 01:45:11.505112+00	\N	1f147af7-a3fd-496f-82d9-a17095c7dd75
00000000-0000-0000-0000-000000000000	471	s7jafk6tlj5o	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-06-29 03:53:52.275977+00	2026-06-29 06:22:01.053388+00	o2m2fhempz57	1f147af7-a3fd-496f-82d9-a17095c7dd75
00000000-0000-0000-0000-000000000000	473	4d6t2zsedqin	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-06-29 06:57:12.389856+00	2026-06-29 06:57:12.389856+00	\N	570148c3-c57f-4ef7-81b7-ad3fb50699f3
00000000-0000-0000-0000-000000000000	474	z7zo4aod7b2h	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-06-29 06:57:14.556209+00	2026-06-29 06:57:14.556209+00	\N	4d51f4be-b750-4bae-b62c-07d90516babd
00000000-0000-0000-0000-000000000000	527	nwzsy3mcchuw	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-03 02:53:29.778798+00	2026-07-03 02:53:29.778798+00	\N	6dac8024-0855-43be-b98c-0590f7fa3252
00000000-0000-0000-0000-000000000000	528	cq3lt6xe4yad	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-03 02:53:30.815756+00	2026-07-03 02:53:30.815756+00	\N	129cb44d-860d-454e-862f-30a0daa19c4c
00000000-0000-0000-0000-000000000000	594	l4v3kq6sl3xh	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-08 16:49:01.398894+00	2026-07-08 16:49:01.398894+00	\N	dcdeb605-99ab-4d42-82fc-c9e025f40579
00000000-0000-0000-0000-000000000000	596	vlxlg6rfkum4	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-09 14:46:03.145006+00	2026-07-09 16:21:52.956172+00	\N	d27f1eae-2d52-4e18-a465-e9f448163e9b
00000000-0000-0000-0000-000000000000	152	7nu4grpobq2g	77ef5472-90d7-42bc-9a61-4c9557055a8b	f	2026-06-16 04:07:54.229209+00	2026-06-16 04:07:54.229209+00	\N	5f6505f0-3567-4d81-8ba9-f116b25e1d04
00000000-0000-0000-0000-000000000000	153	azeohcp6m2uv	77ef5472-90d7-42bc-9a61-4c9557055a8b	f	2026-06-16 04:08:04.573606+00	2026-06-16 04:08:04.573606+00	\N	fa2b17c8-037e-4fbb-8f6d-e0436068ff2c
00000000-0000-0000-0000-000000000000	154	s7t4ozhqhrdi	77ef5472-90d7-42bc-9a61-4c9557055a8b	f	2026-06-16 04:08:05.106222+00	2026-06-16 04:08:05.106222+00	\N	3f5381f4-7265-4dee-bdf1-9c266de00be8
00000000-0000-0000-0000-000000000000	549	yetciveqfkgb	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-03 03:37:57.79263+00	2026-07-10 03:27:01.470682+00	\N	633ebd72-b479-48ab-a5fd-4cbac45cae75
00000000-0000-0000-0000-000000000000	158	utqu2re3di5g	77ef5472-90d7-42bc-9a61-4c9557055a8b	f	2026-06-16 04:16:55.262695+00	2026-06-16 04:16:55.262695+00	\N	a061885a-c4a2-4aa9-8c64-c20b902de36a
00000000-0000-0000-0000-000000000000	159	prqrp43magx7	77ef5472-90d7-42bc-9a61-4c9557055a8b	f	2026-06-16 04:16:55.77767+00	2026-06-16 04:16:55.77767+00	\N	9eb02b12-3c64-4316-9f4b-2c1f47e4a7f4
00000000-0000-0000-0000-000000000000	483	ghdayomjekax	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-06-30 06:01:24.796696+00	2026-06-30 06:01:24.796696+00	\N	6346d41a-7d8e-49b9-a7d6-d613d7775572
00000000-0000-0000-0000-000000000000	484	nvsv3d4pqvst	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-06-30 06:01:26.519166+00	2026-06-30 06:01:26.519166+00	\N	4cadf6c6-c86c-4262-92ee-bf6315b1a025
00000000-0000-0000-0000-000000000000	543	23rwutzzr356	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-03 03:15:29.227223+00	2026-07-03 03:15:29.227223+00	\N	65fbec68-fe99-4149-afef-0957180d2c67
00000000-0000-0000-0000-000000000000	544	2mmgaq4xsoui	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-03 03:15:30.238505+00	2026-07-03 03:15:30.238505+00	\N	7e765d79-5cf9-4996-8405-caf1dc3a3874
00000000-0000-0000-0000-000000000000	488	vvjid6duwerc	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-06-30 06:58:09.622197+00	2026-06-30 06:58:09.622197+00	\N	1025e981-5bce-4581-ad5b-f38b9f1f3e3e
00000000-0000-0000-0000-000000000000	618	t4fzheqwksdo	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-10 16:58:56.697337+00	2026-07-10 16:58:56.697337+00	g3tj7q75vcbv	c2aeb458-7f81-4cef-bc2a-ad7ff6102014
00000000-0000-0000-0000-000000000000	490	lfy6lo6ikhhc	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-06-30 07:19:36.638149+00	2026-06-30 08:18:06.683381+00	\N	d5051427-9ca3-4037-8332-7ffa5c08eafe
00000000-0000-0000-0000-000000000000	550	cfjta4nxnufo	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-03 03:37:58.618695+00	2026-07-03 03:37:58.618695+00	\N	522f476f-cce8-4a54-8e02-a48e7d63a97c
00000000-0000-0000-0000-000000000000	521	5ygbwsup7bwk	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-03 02:38:20.31053+00	2026-07-03 14:04:48.725403+00	\N	b2323879-624e-41fd-8d68-8e2b91dbcb8d
00000000-0000-0000-0000-000000000000	552	blwfhcd65ya3	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-04 06:12:37.695189+00	2026-07-04 17:25:47.149484+00	vr5q4rjplncg	b2323879-624e-41fd-8d68-8e2b91dbcb8d
00000000-0000-0000-0000-000000000000	557	ck3scuzbycbu	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-05 07:03:01.814897+00	2026-07-05 08:01:22.492173+00	\N	3fb962f5-144d-44cc-998f-7af1d31745a0
00000000-0000-0000-0000-000000000000	627	jl66bax6fpdq	d26d7109-aa21-4aff-be7a-52b094d294fa	t	2026-07-11 04:42:40.272478+00	2026-07-11 05:40:58.216687+00	\N	1865d8aa-05a8-439d-bc72-b1d3215a7382
00000000-0000-0000-0000-000000000000	562	4tquscpbntdu	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-05 08:01:22.504142+00	2026-07-05 09:19:42.728088+00	ck3scuzbycbu	3fb962f5-144d-44cc-998f-7af1d31745a0
00000000-0000-0000-0000-000000000000	500	ost3lcuvzsei	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-02 15:47:17.289026+00	2026-07-02 15:47:17.289026+00	c7bztvjurf4y	d5051427-9ca3-4037-8332-7ffa5c08eafe
00000000-0000-0000-0000-000000000000	629	xjvfhwl2dlef	d26d7109-aa21-4aff-be7a-52b094d294fa	t	2026-07-11 06:55:16.621345+00	2026-07-11 07:54:51.236921+00	wxha3aab2i56	1865d8aa-05a8-439d-bc72-b1d3215a7382
00000000-0000-0000-0000-000000000000	467	dt7tfkb2qhal	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-06-28 16:55:27.129649+00	2026-06-28 16:55:27.129649+00	\N	994a658b-e972-4fab-8be8-733fbb67fd6c
00000000-0000-0000-0000-000000000000	566	mc6t4idjf76z	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-05 11:29:00.815178+00	2026-07-05 12:27:24.957084+00	qjzns4v5antq	71348eb2-dc27-41bc-936d-19741a489610
00000000-0000-0000-0000-000000000000	502	gnq7dmc7fdto	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-07-02 17:16:46.623323+00	2026-07-03 01:40:30.786411+00	croktoincr2u	72245f6d-894c-4f7b-b202-43f8bf3c5416
00000000-0000-0000-0000-000000000000	470	o2m2fhempz57	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-06-29 01:45:11.526934+00	2026-06-29 03:53:52.268326+00	2wntofjmmmdc	1f147af7-a3fd-496f-82d9-a17095c7dd75
00000000-0000-0000-0000-000000000000	570	nwg2qnfx7lur	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-05 14:33:41.231371+00	2026-07-05 14:33:41.231371+00	shmsbmfotmiz	6e4c7b66-f323-4bb2-bf20-fdf962d85ab9
00000000-0000-0000-0000-000000000000	572	svtvj7mjubk4	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-05 15:14:37.852495+00	2026-07-05 15:14:37.852495+00	\N	b6b490e9-4fbc-4af8-b6f8-1b4eac55f8b5
00000000-0000-0000-0000-000000000000	574	2vsbqk4yxjod	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-05 15:21:11.522693+00	2026-07-05 15:21:11.522693+00	\N	5d3f16ce-b3fd-45c2-8094-2ba7e14005a6
00000000-0000-0000-0000-000000000000	576	acqlwsciytur	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-05 15:32:30.454469+00	2026-07-05 15:32:30.454469+00	\N	c0894d43-0acd-4f4b-b0b9-b7483ff440b1
00000000-0000-0000-0000-000000000000	465	bjvqwnnlzucn	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-06-28 16:38:59.041523+00	2026-06-29 07:04:28.525347+00	\N	c723486c-31b3-464a-99ce-5e7e5516c29f
00000000-0000-0000-0000-000000000000	475	4gj5axqsrndl	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-06-29 07:04:28.533436+00	2026-06-29 07:04:28.533436+00	bjvqwnnlzucn	c723486c-31b3-464a-99ce-5e7e5516c29f
00000000-0000-0000-0000-000000000000	514	teu3twt4rwge	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-03 02:20:40.771228+00	2026-07-03 02:20:40.771228+00	\N	dd976fee-f6c7-4403-b138-1a50c468903a
00000000-0000-0000-0000-000000000000	515	aium2v42bnc7	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-03 02:20:41.607274+00	2026-07-03 02:20:41.607274+00	\N	27b1295d-c18d-4c56-a876-edf369ac7393
00000000-0000-0000-0000-000000000000	602	ten6hqb6wp4g	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-09 16:21:52.962892+00	2026-07-09 16:21:52.962892+00	vlxlg6rfkum4	d27f1eae-2d52-4e18-a465-e9f448163e9b
00000000-0000-0000-0000-000000000000	472	afb7dkygswu4	e9154374-cb36-40e7-9f3e-c19f685b779d	t	2026-06-29 06:22:01.064574+00	2026-07-09 16:38:29.372437+00	s7jafk6tlj5o	1f147af7-a3fd-496f-82d9-a17095c7dd75
00000000-0000-0000-0000-000000000000	604	t72tkpvf2tq5	e9154374-cb36-40e7-9f3e-c19f685b779d	f	2026-07-09 16:38:29.380672+00	2026-07-09 16:38:29.380672+00	afb7dkygswu4	1f147af7-a3fd-496f-82d9-a17095c7dd75
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at", "disabled") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_challenges" ("id", "user_id", "challenge_type", "session_data", "created_at", "expires_at") FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_credentials" ("id", "user_id", "credential_id", "public_key", "attestation_type", "aaguid", "sign_count", "transports", "backup_eligible", "backed_up", "friendly_name", "created_at", "updated_at", "last_used_at") FROM stdin;
\.


--
-- Data for Name: dentists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."dentists" ("id", "dentist_name", "specialty", "phone", "telegram", "background", "age", "created_at", "image_path") FROM stdin;
5deefcad-2388-4b18-8ba0-a99f4b02ddfc	Dr. Yann LaiE	Veas Kat	0985555333		VeasKat-KatJit:) Love ke alone for many years, but ke ort love vinh😣	19	2026-06-15 04:26:40+00	1782438856167-download.png
dacd2ca4-1c46-4fe2-a03d-8917c638dafa	Dr. Jennie Kim	Jawbreaker	087578465		I break people teeth for money	25	2026-06-19 07:53:13.67255+00	Jennie.png
e8735753-a7d1-4bec-b4d8-cfb61ea62fb6	Dr. Jean Rill	General Dentist	012445566		12+ years specializing in braces and aligner therapy for all ages.	40	2026-06-12 16:58:50+00	Jean_Rill.png
833905e5-dbae-4d83-af21-54b1d0d62751	Dr. Mai Sreynuth	Heart Care	0714103033		Pukea vorha jub knea kal na yy ort chob. jol jit chill chill and  silly.	19	2026-06-15 04:21:59+00	Mai_Sreynuth.png
9906a94e-39a1-4c35-89b5-0d5633059935	Dr. Ly Meas	Orthodontics	098777755		Specialist in braces and teeth alignment	18	2026-06-10 05:46:25.842853+00	Ly_Meas.png
12491bea-56e4-4034-9659-689a9bb0d33c	Dr. Phea Sreynith	General Dentistry	097444412		10 years experience in general dental care	20	2026-06-10 05:46:30.761848+00	Phea_Sreynith.png
583761fb-2780-44a8-9fd1-cb1e373844d6	Dr. Yoo Rii	teeth care	074657344		10 year experience of study abroad at UAS	40	2026-06-22 16:02:00+00	Yoo_Rii.png
985007a1-5644-4d34-befe-ac9f54a500dc	Dr. Michael Lee	Orthodontics	0987654321		Specialist in braces and teeth alignment	40	2026-06-10 05:46:30.761848+00	Michael_Lee.png
\.


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."patients" ("id", "full_name", "email", "phone", "sex", "date_of_birth", "address", "created_at", "updated_at", "is_banned") FROM stdin;
4d19b920-e211-4536-a988-3aa9903067cb	yann seaklay	yannlaie123@gmail.com	093579220	female	\N	\N	2026-06-09 09:25:38.299548+00	2026-06-09 09:25:38.299548+00	\N
8ae26299-1ad0-42de-b05f-ed17dabf6081	yann laiE	yannlaie12@gmail.com	0967856745	female	\N	\N	2026-06-09 09:40:30.17831+00	2026-06-09 09:40:30.17831+00	\N
ec130a1b-822f-4cb5-a363-7ac7256783ea	yann	sdgwergSgw@gmail.com	03452341234	female	\N	\N	2026-06-09 10:00:38.269076+00	2026-06-09 10:00:38.269076+00	\N
248c8164-c286-423c-99a4-972d4ffc6c04	yann	yann12@gmail.com	0785675645	female	\N	\N	2026-06-09 10:34:06.567379+00	2026-06-09 10:34:06.567379+00	\N
e38b31ce-3d9d-46f4-8b5d-54dd42ed1038	nuth smos	sreynuthmai@gmail.com	0714103033	female	2006-01-12	Cambodia	2026-07-08 16:32:28.960547+00	2026-07-08 16:32:28.960547+00	\N
ff9d87aa-2c0d-48b0-a72b-62081fd318f9	Seaklay	maisreynuth1@gmail.com	+85593579220	female	2006-12-24	somnong 12	2026-06-09 14:07:36.397423+00	2026-06-09 14:07:36.397423+00	\N
4c35709e-646b-4f8d-8555-5773898f638a	nuth	sreynuthmai8@gmail.com	0714103033	female	\N	\N	2026-06-15 02:28:24.081215+00	2026-06-15 02:28:24.081215+00	\N
72284bc0-d3d6-4cfe-8777-3c0485682cc3	Ly Meas	Lymeas9999@gmail.com	0962662682	male	\N	\N	2026-06-16 02:26:47.597522+00	2026-06-16 02:26:47.597522+00	\N
e914c318-0ace-458b-92e3-f6d7fc9064bb	yanich	you123@gamil.com	0934758943	female	\N	\N	2026-06-16 02:33:30.538357+00	2026-06-16 02:33:30.538357+00	\N
e220ec64-7b21-4af6-a7a8-93dd303893e9	nuthnuth	nuthnuth@gmail.com	0714103033	female	\N	\N	2026-06-16 02:34:54.183209+00	2026-06-16 02:34:54.183209+00	\N
fde5aff7-1517-470f-ad94-2b4ac5227f59	sreynuth	sreynuth@gmailcom	0714103033	female	\N	\N	2026-06-16 02:36:16.783736+00	2026-06-16 02:36:16.783736+00	\N
36127943-0610-4290-b44c-d00e6c1d5e6e	nuthnuth	nuth@gmail.com	0714103033	female	\N	\N	2026-06-16 04:04:15.398565+00	2026-06-16 04:04:15.398565+00	\N
8d0cf94b-46cf-4b20-b12b-6db4cffe065d	measmeas	meas123@gmail.com	0947684563	male	\N	\N	2026-06-16 04:06:50.787938+00	2026-06-16 04:06:50.787938+00	\N
77ef5472-90d7-42bc-9a61-4c9557055a8b	laiE	laiE123@gmail.com	097654356	female	\N	\N	2026-06-16 04:07:54.786559+00	2026-06-16 04:07:54.786559+00	\N
162b1dd3-f73c-4575-ac70-02b17ae313cf	nith	nith123@gmail	0713033410	female	\N	\N	2026-06-16 04:16:08.120614+00	2026-06-16 04:16:08.120614+00	t
270b1b52-5aef-4e8b-9bc8-60b49bcc6d06	Jesus Christ	jeus_holy_water@gmail.com	012345678	male	\N	\N	2026-06-19 07:38:32.016184+00	2026-06-19 07:38:32.016184+00	\N
ef15cee2-5a7f-446e-a8f3-3f0c01e80309	yann	maisreynuth@gmail.com	09875678	male	\N	\N	2026-06-09 12:51:05.875878+00	2026-06-09 12:51:05.875878+00	t
365dec6d-e007-4bde-a127-c5a0dee2fb32	yann laiey	yannseaklay253213@gmail.com	093579220	male	\N	\N	2026-06-25 13:22:13.408047+00	2026-06-25 13:22:13.408047+00	\N
8475af18-b5d5-49ff-bf73-a174246fe315	lymeas	lymeas@gmail.com	962662682	male	\N	\N	2026-06-26 03:52:41.350671+00	2026-06-26 03:52:41.350671+00	\N
c4015fc3-85e6-42f2-a2d4-6eac75ddc45e	Yann Seaklay	xingrover85@gmail.com	090878799	female	\N	\N	2026-06-26 17:20:12.460586+00	2026-06-26 17:20:12.460586+00	\N
8b04af03-0c89-4449-8935-f3f133df0c36	Tooth Time	yannlaie741@gmail.com	096785675	male	\N	\N	2026-06-28 10:49:14.91195+00	2026-06-28 10:49:14.91195+00	\N
4d20d06b-4dad-4904-942b-ea9d698a6c19	lisa	maisreynuth7@gmail.com	05946666	female	2003-01-02		2026-06-16 04:22:18.986127+00	2026-06-16 04:22:18.986127+00	\N
9934c511-6f5f-490a-a0cc-6fb9bb930212	test	test@gmail.com	0867857658	male	\N	\N	2026-07-03 02:54:07.782657+00	2026-07-03 02:54:07.782657+00	\N
b856b203-3021-4054-82eb-b53810a5c4d4	nuth	maisreynuth8@gmail.com	0986576	female	2012-12-12		2026-07-03 03:14:22.119531+00	2026-07-03 03:14:22.119531+00	\N
f45a17dd-10d5-49e8-8fc6-53e15f3a9950	Kim	kimhuoyyann@gmail.com	066523164	female	\N	\N	2026-07-09 16:17:08.179972+00	2026-07-09 16:17:08.179972+00	\N
d26d7109-aa21-4aff-be7a-52b094d294fa	Yann laiE	yannseaklay2412@gmail.com	+85593579220	female	1996-07-10	Phnom Penh 	2026-06-26 18:21:56.040616+00	2026-06-26 18:21:56.040616+00	\N
\.


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."appointments" ("id", "patient_id", "dentist_id", "status", "notes", "created_at", "appointment_date", "start_time", "end_time") FROM stdin;
f713ede2-900c-4f01-a817-b6fad4680ebc	d26d7109-aa21-4aff-be7a-52b094d294fa	dacd2ca4-1c46-4fe2-a03d-8917c638dafa	expired		2026-07-05 09:37:41.179818+00	2026-07-06	14:50:00	16:00:00
acfd492e-e56b-45be-a58e-52ea66703c96	d26d7109-aa21-4aff-be7a-52b094d294fa	5deefcad-2388-4b18-8ba0-a99f4b02ddfc	expired	Os luy jay hz	2026-07-05 15:48:30.919697+00	2026-07-06	15:00:00	16:00:00
1f217415-424b-4ea7-972e-b9dd5181e811	d26d7109-aa21-4aff-be7a-52b094d294fa	5deefcad-2388-4b18-8ba0-a99f4b02ddfc	expired		2026-07-05 13:05:02.166731+00	2026-07-08	10:15:00	11:30:00
a5120274-c966-4435-9f4e-ae231e222f3b	e38b31ce-3d9d-46f4-8b5d-54dd42ed1038	5deefcad-2388-4b18-8ba0-a99f4b02ddfc	expired		2026-07-08 16:36:37.418452+00	2026-07-09	10:00:00	11:00:00
813a81bf-c69a-4a6d-b6c0-2c60e70725b5	d26d7109-aa21-4aff-be7a-52b094d294fa	5deefcad-2388-4b18-8ba0-a99f4b02ddfc	expired		2026-07-09 16:47:05.764419+00	2026-07-10	09:40:00	10:20:00
79c842c6-2e43-4c0e-a365-ae3ada8a5d5d	4d20d06b-4dad-4904-942b-ea9d698a6c19	833905e5-dbae-4d83-af21-54b1d0d62751	expired		2026-07-03 02:23:52.959387+00	2026-07-10	09:00:00	09:30:00
1479348d-a2af-40ad-8393-6553fcfb264e	365dec6d-e007-4bde-a127-c5a0dee2fb32	9906a94e-39a1-4c35-89b5-0d5633059935	confirmed	alak  Z  j'muy  mnos	2026-06-25 13:25:00.641152+00	\N	\N	\N
47b07929-b59f-4fe7-9924-0273794edd71	4d20d06b-4dad-4904-942b-ea9d698a6c19	833905e5-dbae-4d83-af21-54b1d0d62751	done		2026-06-18 16:15:45.935651+00	\N	\N	\N
91278066-d97e-4396-bf1c-c98c805b21c9	4d20d06b-4dad-4904-942b-ea9d698a6c19	5deefcad-2388-4b18-8ba0-a99f4b02ddfc	done		2026-06-20 05:53:02.856458+00	2026-06-21	09:00:00	09:45:00
d9b90f0c-d1f4-4c9c-81a3-9dcf091bfbbc	b856b203-3021-4054-82eb-b53810a5c4d4	985007a1-5644-4d34-befe-ac9f54a500dc	done		2026-07-03 03:15:12.745845+00	2026-07-07	09:45:00	10:30:00
6f05db55-bbba-45a8-9cc4-45f456eb094a	4d20d06b-4dad-4904-942b-ea9d698a6c19	5deefcad-2388-4b18-8ba0-a99f4b02ddfc	expired		2026-06-29 07:41:12.826672+00	2026-07-02	16:30:00	17:00:00
ea6eb401-0397-4baa-8561-c0a4f2f4496f	d26d7109-aa21-4aff-be7a-52b094d294fa	5deefcad-2388-4b18-8ba0-a99f4b02ddfc	done		2026-07-04 18:13:41.966783+00	2026-07-05	10:00:00	11:00:00
688228de-7d57-4b45-98b4-73e4a6f5c5d0	d26d7109-aa21-4aff-be7a-52b094d294fa	5deefcad-2388-4b18-8ba0-a99f4b02ddfc	expired		2026-07-05 13:08:06.438851+00	2026-07-05	09:00:00	10:00:00
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."services" ("id", "service_name", "description", "price", "duration_minutes", "created_at", "image_url") FROM stdin;
3d724a56-9c1d-4c23-ab1d-8a3bbb8a6419	Dental Filling	Repairs a cavity or small hole in a tooth. Best if you feel sharp or lingering pain when eating sweets, or sensitivity to hot/cold in one specific tooth, especially when biting down.	60.00	45	2026-06-10 05:46:25.842853+00	https://jospdlqridyaiuhhaqpl.supabase.co/storage/v1/object/public/file_image/1783264739966-a.jpg
58201fcb-93c9-4fd7-80cc-194fffbc7b7f	Dental Crown	Caps a tooth that is cracked, chipped, or worn down after a large filling or injury. Best if a tooth feels weak, has a visible chip or crack, or hurts specifically when chewing on that spot.	10.00	30	2026-06-17 05:14:45+00	https://jospdlqridyaiuhhaqpl.supabase.co/storage/v1/object/public/file_image/1783264978342-b.jpg
21573a92-b5e5-4374-9e64-f64549b52817	General Check-up	Routine exam and cleaning for patients with no specific pain — covers plaque/tartar removal, cavity screening, and a general oral health check. Best for routine visits, mild discomfort, or if it has been a while since your last visit.	50.00	30	2026-06-10 05:46:25.842853+00	https://jospdlqridyaiuhhaqpl.supabase.co/storage/v1/object/public/file_image/1783265265056-d.jpg
1a6b9310-3afc-4983-a02e-b871592a34d6	Root Canal Treatment	Treats an infected or severely decayed tooth nerve. Best if there is intense throbbing pain (especially at night), pain that lingers long after hot/cold contact, or visible swelling near a tooth.	50.00	40	2026-06-17 05:15:18+00	https://jospdlqridyaiuhhaqpl.supabase.co/storage/v1/object/public/file_image/1783265312957-e.jpg
328ace01-60d6-4e24-ba15-41c5ead5a3c2	Teeth Whitening	Cosmetic treatment to remove stains and brighten tooth color. Best if there is no pain at all — the only concern is that teeth look yellow, stained, or dull.	120.00	60	2026-06-10 05:46:30.761848+00	https://jospdlqridyaiuhhaqpl.supabase.co/storage/v1/object/public/file_image/1783265388650-f.jpg
5cdbe861-f5a5-432e-b3e6-2ffbc6548993	Braces (Orthodontics)	Corrects crooked, crowded, or misaligned teeth and bite problems (overbite/underbite). Best if there is no pain — the concern is about alignment, spacing, or how the jaw/bite fits together.	1200.00	60	2026-06-10 05:46:30.761848+00	https://jospdlqridyaiuhhaqpl.supabase.co/storage/v1/object/public/file_image/1783266169698-a.jpg
\.


--
-- Data for Name: appointment_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."appointment_services" ("id", "appointment_id", "service_id") FROM stdin;
cc97c89e-625a-4b22-82fd-d0a7df348986	47b07929-b59f-4fe7-9924-0273794edd71	3d724a56-9c1d-4c23-ab1d-8a3bbb8a6419
dbd68557-809d-48ae-ad05-cf9e431709d4	91278066-d97e-4396-bf1c-c98c805b21c9	3d724a56-9c1d-4c23-ab1d-8a3bbb8a6419
c0d9199e-666a-4184-934b-72d72bef5f88	1479348d-a2af-40ad-8393-6553fcfb264e	5cdbe861-f5a5-432e-b3e6-2ffbc6548993
4a637838-02dc-489e-a2ff-14debbab170c	6f05db55-bbba-45a8-9cc4-45f456eb094a	21573a92-b5e5-4374-9e64-f64549b52817
cc9fc62e-8b29-442f-bdc3-2b7c123af612	79c842c6-2e43-4c0e-a365-ae3ada8a5d5d	21573a92-b5e5-4374-9e64-f64549b52817
5a743d65-c7dc-4cc6-84b5-37ffd54cbd09	d9b90f0c-d1f4-4c9c-81a3-9dcf091bfbbc	3d724a56-9c1d-4c23-ab1d-8a3bbb8a6419
e342f947-2c9b-439b-8898-6e39c9c953ab	ea6eb401-0397-4baa-8561-c0a4f2f4496f	5cdbe861-f5a5-432e-b3e6-2ffbc6548993
b029528b-5433-4482-8939-63fce1bd8bae	f713ede2-900c-4f01-a817-b6fad4680ebc	1a6b9310-3afc-4983-a02e-b871592a34d6
b7a1a54c-9333-4c21-b4ea-ae6e1dbbc89a	f713ede2-900c-4f01-a817-b6fad4680ebc	21573a92-b5e5-4374-9e64-f64549b52817
98895ea9-0ab7-4618-982f-b05e0bff68aa	1f217415-424b-4ea7-972e-b9dd5181e811	3d724a56-9c1d-4c23-ab1d-8a3bbb8a6419
196fa78d-689b-41b3-8e4e-3cf06c602d6e	1f217415-424b-4ea7-972e-b9dd5181e811	21573a92-b5e5-4374-9e64-f64549b52817
5d6ccfa4-6d64-499b-9ade-11f78b91e127	688228de-7d57-4b45-98b4-73e4a6f5c5d0	5cdbe861-f5a5-432e-b3e6-2ffbc6548993
c2a28d9e-52c8-478b-bee8-c155cb251f54	acfd492e-e56b-45be-a58e-52ea66703c96	328ace01-60d6-4e24-ba15-41c5ead5a3c2
a266bccd-404f-4619-ab9e-ef72037f20f2	a5120274-c966-4435-9f4e-ae231e222f3b	328ace01-60d6-4e24-ba15-41c5ead5a3c2
3fad19d1-8281-4c83-8490-083a0e6f7c3c	813a81bf-c69a-4a6d-b6c0-2c60e70725b5	1a6b9310-3afc-4983-a02e-b871592a34d6
\.


--
-- Data for Name: concerns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."concerns" ("id", "message", "created_at") FROM stdin;
6ec529d8-8edb-4201-a54c-3689845fd167	tonh  dol hz	2026-07-05 10:30:13.629181+00
f1441388-4bfc-4748-9dec-a523bbe3e6c7	Check Merl system oy srul bul phg	2026-07-05 15:49:22.5503+00
e1004c7c-2707-470c-a670-d786a4482369	i hurt my teeth so bad	2026-07-08 16:35:25.634934+00
0ecc5cd4-a29a-4850-84aa-afd852dda64b	i hate u	2026-07-10 03:18:41.250896+00
\.


--
-- Data for Name: dentist_schedules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."dentist_schedules" ("id", "dentist_id", "start_time", "end_time") FROM stdin;
b374684c-689d-48ca-a80e-5692a12f291d	12491bea-56e4-4034-9659-689a9bb0d33c	09:00:00	17:00:00
3698cdf1-8e4b-4623-9ef9-47dbe0453b33	5deefcad-2388-4b18-8ba0-a99f4b02ddfc	09:00:00	17:00:00
2f1f617c-b1f1-45fa-8d2a-2e091b9908d0	833905e5-dbae-4d83-af21-54b1d0d62751	09:00:00	17:00:00
e64621fb-1402-47d0-8528-5c95a2f83648	985007a1-5644-4d34-befe-ac9f54a500dc	09:00:00	17:00:00
7de948f4-c220-4cc9-9365-0630f21567b8	9906a94e-39a1-4c35-89b5-0d5633059935	09:00:00	17:00:00
070553f7-702e-4496-977e-54e84a6897dd	dacd2ca4-1c46-4fe2-a03d-8917c638dafa	09:00:00	17:00:00
7c69e8d2-d1ed-44d0-a3b5-a2f7bf3f9f3b	e8735753-a7d1-4bec-b4d8-cfb61ea62fb6	09:00:00	17:00:00
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."notifications" ("id", "patient_id", "dentist_id", "appointment_id", "message", "created_at") FROM stdin;
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."password_reset_tokens" ("id", "email", "token_hash", "expires_at", "used", "created_at") FROM stdin;
1f7da5bb-662e-4c61-9870-f39e88fa6b40	xingrover85@gmail.com	a3000bf98509e694a6b8b1d455f03863172c705bf70e9eb27b171ca9afb4b026	2026-06-26 18:48:02.741+00	f	2026-06-26 18:18:03.468229+00
a896becf-f0bc-494b-9152-71d64194583c	sreynuthmai8@gmail.com	e5e364b64e67effc88e73fb7a971367704ee93c4c7f2b950b05b1e0e10e2b29e	2026-07-10 17:42:19.574+00	t	2026-07-10 17:12:20.473975+00
702b5e01-1591-4093-a0d9-56bcc410093a	kimhuoyyann@gmail.com	520bd03adfd22620967b9cc6364d887e1f1ee355a9f9879dcf3b288d2f2258ca	2026-07-09 16:48:20.593+00	f	2026-07-09 16:18:21.2286+00
451a1e78-bbc6-42d4-ae5c-64313680f040	yannseaklay2412@gmail.com	6ed3327d10ad15f42dc2a0cdc5ca504cdc73f1c24537836869407ae26cc99cf1	2026-07-10 03:43:54.398+00	t	2026-07-10 03:13:54.348379+00
5f6160d1-5934-4d6f-904e-7c89f6ffbf4b	maisreynuth8@gmail.com	8f0adc0775f43b85c3e8d961e664ae452e14dc7a33c955f2b8e17b462980b7a8	2026-07-10 03:58:12.501+00	f	2026-07-10 03:28:12.64802+00
b3f5d3cc-c55a-4d57-9711-c93b9e6c1903	sreynuthmai@gmail.com	1fdfdc333e441c1724715e794260eaa4c928db987c25ef150823bde50d6a735c	2026-07-10 04:05:58.511+00	f	2026-07-10 03:35:58.756363+00
527cb9d2-470e-4513-96bf-3dced1079051	yannlaie741@gmail.com	ede5f7ccecce0b99518e646989315ebce0e54f4b34a673db5d4eed1762c4ab47	2026-06-28 12:09:05.689+00	t	2026-06-28 11:39:05.909182+00
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profiles" ("id", "email", "role") FROM stdin;
ff9d87aa-2c0d-48b0-a72b-62081fd318f9	maisreynuth1@gmail.com	patient
4c35709e-646b-4f8d-8555-5773898f638a	sreynuthmai8@gmail.com	patient
72284bc0-d3d6-4cfe-8777-3c0485682cc3	Lymeas9999@gmail.com	patient
e914c318-0ace-458b-92e3-f6d7fc9064bb	you123@gamil.com	patient
e220ec64-7b21-4af6-a7a8-93dd303893e9	nuthnuth@gmail.com	patient
fde5aff7-1517-470f-ad94-2b4ac5227f59	sreynuth@gmailcom	patient
36127943-0610-4290-b44c-d00e6c1d5e6e	nuth@gmail.com	patient
8d0cf94b-46cf-4b20-b12b-6db4cffe065d	meas123@gmail.com	patient
77ef5472-90d7-42bc-9a61-4c9557055a8b	laiE123@gmail.com	patient
162b1dd3-f73c-4575-ac70-02b17ae313cf	nith123@gmail	patient
c78afe56-ceaf-4cb8-b9a1-127c29d2afe9	phavy@gmail.com	patient
4d20d06b-4dad-4904-942b-ea9d698a6c19	maisreynuth7@gmail.com	patient
b61f5568-3903-4ef4-87ac-b0d16ab484a9	lay@gmail.com	patient
270b1b52-5aef-4e8b-9bc8-60b49bcc6d06	jeus_holy_water@gmail.com	patient
365dec6d-e007-4bde-a127-c5a0dee2fb32	yannseaklay253213@gmail.com	patient
8475af18-b5d5-49ff-bf73-a174246fe315	lymeas@gmail.com	patient
c4015fc3-85e6-42f2-a2d4-6eac75ddc45e	xingrover85@gmail.com	patient
d26d7109-aa21-4aff-be7a-52b094d294fa	yannseaklay2412@gmail.com	patient
8b04af03-0c89-4449-8935-f3f133df0c36	yannlaie741@gmail.com	patient
e9154374-cb36-40e7-9f3e-c19f685b779d	admin123@gmail.com	admin
9934c511-6f5f-490a-a0cc-6fb9bb930212	test@gmail.com	patient
b856b203-3021-4054-82eb-b53810a5c4d4	maisreynuth8@gmail.com	patient
e38b31ce-3d9d-46f4-8b5d-54dd42ed1038	sreynuthmai@gmail.com	patient
f45a17dd-10d5-49e8-8fc6-53e15f3a9950	kimhuoyyann@gmail.com	patient
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") FROM stdin;
file_image	file_image	\N	2026-06-16 02:30:04.972057+00	2026-06-16 02:30:04.972057+00	t	f	1048576	\N	\N	STANDARD
service_img	service_img	\N	2026-06-29 08:16:27.586979+00	2026-06-29 08:16:27.586979+00	t	f	\N	\N	\N	STANDARD
logo	logo	\N	2026-07-11 04:35:05.674561+00	2026-07-11 04:35:05.674561+00	t	f	1048576	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_analytics" ("name", "type", "format", "created_at", "updated_at", "id", "deleted_at") FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_vectors" ("id", "type", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") FROM stdin;
bf073f7d-2d6b-44fc-a77a-d2edafa9fb06	file_image	dentist.png	\N	2026-06-20 06:18:47.735122+00	2026-06-20 06:18:47.735122+00	2026-06-20 06:18:47.735122+00	{"eTag": "\\"021d60611abf990148f9ae277b11b5a8-1\\"", "size": 250876, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-20T06:18:48.000Z", "contentLength": 250876, "httpStatusCode": 200}	d764fb58-e4b1-4e62-8bf8-df9b447adca6	\N	\N
df846039-b78f-412e-b8eb-29417d58671c	file_image	1781974909235-b6d98105ee63b3f87fc359bc976c3d51.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-20 17:01:49.582206+00	2026-06-20 17:01:49.582206+00	2026-06-20 17:01:49.582206+00	{"eTag": "\\"bcd152c19e4639303b90b19dec4ff130\\"", "size": 46223, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-20T17:01:50.000Z", "contentLength": 46223, "httpStatusCode": 200}	4ecf8fca-a621-4215-9542-081e97fc363f	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
914813d2-12e6-4607-b70c-36f5bd5c4cf6	file_image	1781975335167-b6d98105ee63b3f87fc359bc976c3d51.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-20 17:08:55.640526+00	2026-06-20 17:08:55.640526+00	2026-06-20 17:08:55.640526+00	{"eTag": "\\"bcd152c19e4639303b90b19dec4ff130\\"", "size": 46223, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-20T17:08:56.000Z", "contentLength": 46223, "httpStatusCode": 200}	3ad59d99-a532-4bda-92f1-f98956f4069a	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
a3c9d309-f5d6-4c85-8765-695e804174c6	file_image	Yann_LaiE.png	\N	2026-06-21 15:59:12.861534+00	2026-06-21 15:59:12.861534+00	2026-06-21 15:59:12.861534+00	{"eTag": "\\"667610ef2af118de15523dcf9e5aaa7b-1\\"", "size": 223278, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-21T15:59:11.000Z", "contentLength": 223278, "httpStatusCode": 200}	1707fd4f-4677-4b62-9296-a2195bfdeeb1	\N	\N
ee0dbb38-9d28-4177-8b01-ee8605d400fe	file_image	Ly_Meas.png	\N	2026-06-21 15:59:12.859365+00	2026-06-21 15:59:12.859365+00	2026-06-21 15:59:12.859365+00	{"eTag": "\\"4bb9c85d3fb814852cd1bd218efbc231-1\\"", "size": 199175, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-21T15:59:11.000Z", "contentLength": 199175, "httpStatusCode": 200}	c05ebe69-0cf6-4fb6-a820-0771ebef6473	\N	\N
bc5d6c44-0e36-4a2e-902e-0f49f76c0c31	file_image	Michael_Lee.png	\N	2026-06-21 15:59:12.932007+00	2026-06-21 15:59:12.932007+00	2026-06-21 15:59:12.932007+00	{"eTag": "\\"ed1e946b9a52998be938427af3e80a03-1\\"", "size": 311104, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-21T15:59:11.000Z", "contentLength": 311104, "httpStatusCode": 200}	54b20674-3f84-4d26-93e8-fb30cff5cdb2	\N	\N
80dfb971-73a4-4ab5-8e94-f8fcc3482e32	file_image	Phea_Sreynith.png	\N	2026-06-21 15:59:12.936095+00	2026-06-21 15:59:12.936095+00	2026-06-21 15:59:12.936095+00	{"eTag": "\\"f2aea2be38d6fba8b502ae9295645151-1\\"", "size": 280397, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-21T15:59:11.000Z", "contentLength": 280397, "httpStatusCode": 200}	20bb8dcb-b7ae-4b60-b205-951d0208abaf	\N	\N
eccca824-b8b8-4776-9095-902e4eae5f2a	file_image	Mai_Sreynuth.png	\N	2026-06-21 15:59:12.960056+00	2026-06-21 15:59:12.960056+00	2026-06-21 15:59:12.960056+00	{"eTag": "\\"f6995454a386fb1a5e930dd731b8e649-1\\"", "size": 207634, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-21T15:59:11.000Z", "contentLength": 207634, "httpStatusCode": 200}	0075a688-e6ef-497b-bbbe-9d0aefb77116	\N	\N
c0290712-1fa7-4362-a67f-e3dfef2218d3	file_image	Yoo_Rii.png	\N	2026-06-21 15:59:13.015135+00	2026-06-21 15:59:13.015135+00	2026-06-21 15:59:13.015135+00	{"eTag": "\\"295d4e8a64a1943f2ba9915c73c2dbdb-1\\"", "size": 378966, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-21T15:59:11.000Z", "contentLength": 378966, "httpStatusCode": 200}	1b14a558-51b2-46d2-8344-417c88a1d6c6	\N	\N
5511e551-1941-4df6-9968-99651f0a03c6	file_image	Jean_Rill.png	\N	2026-06-21 15:59:13.025425+00	2026-06-21 15:59:13.025425+00	2026-06-21 15:59:13.025425+00	{"eTag": "\\"bfd5d5bb77de9d09302cea92f14cda61-1\\"", "size": 384447, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-21T15:59:11.000Z", "contentLength": 384447, "httpStatusCode": 200}	1e530984-fb48-45b1-8d57-c0852e83a842	\N	\N
dccedf48-733a-428a-bfdc-c083b27384b1	file_image	1782113813121-ab3495d3945981d25c28470caf326843.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-22 07:36:54.105195+00	2026-06-22 07:36:54.105195+00	2026-06-22 07:36:54.105195+00	{"eTag": "\\"39e3606fac0487072203112ad90e40e7\\"", "size": 67385, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-22T07:36:55.000Z", "contentLength": 67385, "httpStatusCode": 200}	95adf43e-4fbf-4136-bbbe-7a5840a565b9	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
39f790ca-2962-4087-8e7b-a85641ed7a01	file_image	1782114402600-ab3495d3945981d25c28470caf326843.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-22 07:46:43.49767+00	2026-06-22 07:46:43.49767+00	2026-06-22 07:46:43.49767+00	{"eTag": "\\"39e3606fac0487072203112ad90e40e7\\"", "size": 67385, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-22T07:46:44.000Z", "contentLength": 67385, "httpStatusCode": 200}	28ea134f-b966-4a39-a1d6-aec6386c6b1e	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
64992734-f4d0-4322-8ba4-01fc303a4fa2	file_image	1782114414982-8a9495bf94dac7b9a5a26d8e1a736b24.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-22 07:46:55.784077+00	2026-06-22 07:46:55.784077+00	2026-06-22 07:46:55.784077+00	{"eTag": "\\"e3a57309267c3ad242cc14f29d1340ab\\"", "size": 53960, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-22T07:46:56.000Z", "contentLength": 53960, "httpStatusCode": 200}	b76d1c8f-7db2-431c-bf92-a43297b2f873	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
438e81af-a7f3-4856-86f8-16d94a99b9cc	file_image	1782115025329-8a9495bf94dac7b9a5a26d8e1a736b24.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-22 07:57:06.319172+00	2026-06-22 07:57:06.319172+00	2026-06-22 07:57:06.319172+00	{"eTag": "\\"e3a57309267c3ad242cc14f29d1340ab\\"", "size": 53960, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-22T07:57:07.000Z", "contentLength": 53960, "httpStatusCode": 200}	60982e64-d69d-415e-91b5-97437ba7660b	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
0fc3fc13-4b1d-4e2c-ace8-83cef4641467	file_image	1782115035183-ab3495d3945981d25c28470caf326843.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-22 07:57:16.02818+00	2026-06-22 07:57:16.02818+00	2026-06-22 07:57:16.02818+00	{"eTag": "\\"39e3606fac0487072203112ad90e40e7\\"", "size": 67385, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-22T07:57:16.000Z", "contentLength": 67385, "httpStatusCode": 200}	0eb3f183-ac8f-4b83-8fdc-d7a1434fd6c4	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
c372fb95-8a4f-49af-b5a3-0c27397b2cb0	file_image	1782395205488-pet sart.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:46:45.649293+00	2026-06-25 13:46:45.649293+00	2026-06-25 13:46:45.649293+00	{"eTag": "\\"ced2669dacb264c0b78558405764d53e\\"", "size": 44531, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:46:46.000Z", "contentLength": 44531, "httpStatusCode": 200}	6ddee2d1-919b-47f4-9c57-234ee6d49323	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
73c38d9b-e773-464d-ad3a-bb98d7d99e28	file_image	1782395220493-pet sart1.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:47:00.402107+00	2026-06-25 13:47:00.402107+00	2026-06-25 13:47:00.402107+00	{"eTag": "\\"9f1ef9b3788b254a4836bccdf2581727\\"", "size": 51830, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:47:01.000Z", "contentLength": 51830, "httpStatusCode": 200}	145030d2-0acb-42b1-acfb-ecde46dc8888	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
d9920b52-3474-44d0-9ccc-004fb51311ff	file_image	1782395237630-pat sart2.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:47:17.69794+00	2026-06-25 13:47:17.69794+00	2026-06-25 13:47:17.69794+00	{"eTag": "\\"d54a640ecba9d68372bafe95303819e4\\"", "size": 151554, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:47:18.000Z", "contentLength": 151554, "httpStatusCode": 200}	19001dbe-acf2-481e-b43a-936e2d81bf3b	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
cb8296d6-441a-499e-b820-f072ff7d1d43	file_image	1782395376369-pet sart1.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:49:36.440649+00	2026-06-25 13:49:36.440649+00	2026-06-25 13:49:36.440649+00	{"eTag": "\\"db8ee359bb037ef895c6aafda8222b01\\"", "size": 56553, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:49:37.000Z", "contentLength": 56553, "httpStatusCode": 200}	1068cecf-3a7e-4ce5-8743-2c6107a304b4	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
07a55437-c852-4393-b69a-a271040d0e0f	file_image	1782395387498-pet sart.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:49:47.498567+00	2026-06-25 13:49:47.498567+00	2026-06-25 13:49:47.498567+00	{"eTag": "\\"ced2669dacb264c0b78558405764d53e\\"", "size": 44531, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:49:48.000Z", "contentLength": 44531, "httpStatusCode": 200}	77cd6d31-fed1-4d56-980b-c6fe0524bbc1	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
b6bdaeea-b541-4634-8bc8-0d4d36223a74	file_image	1782395432160-pet sart.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:50:32.043879+00	2026-06-25 13:50:32.043879+00	2026-06-25 13:50:32.043879+00	{"eTag": "\\"99a2f3a5be2b17cc67420ee4325f5c07\\"", "size": 40723, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:50:33.000Z", "contentLength": 40723, "httpStatusCode": 200}	1d9bf74c-9001-44d1-9585-f2e9a6d21b57	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
935a77a9-2d62-4881-bfd6-e4fb3de18e5a	file_image	1782395541370-pet sart.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:52:21.371577+00	2026-06-25 13:52:21.371577+00	2026-06-25 13:52:21.371577+00	{"eTag": "\\"5748c8ca196854b007eeec6153720dc1\\"", "size": 99482, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:52:22.000Z", "contentLength": 99482, "httpStatusCode": 200}	39f5c92d-c718-4ba4-b575-60e81c03d5cd	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
61d5e316-bf53-42a4-a160-b323fded48c1	file_image	1782395584651-pet sart.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:53:04.768783+00	2026-06-25 13:53:04.768783+00	2026-06-25 13:53:04.768783+00	{"eTag": "\\"366f879e8e045434aef976ced709369d\\"", "size": 122789, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:53:05.000Z", "contentLength": 122789, "httpStatusCode": 200}	249da405-90ef-4f82-8aa9-15d40da87ec1	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
abcb914d-8d49-4d77-8a6e-aaeb97664d1a	file_image	1782395628420-pat sart2.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:53:48.554559+00	2026-06-25 13:53:48.554559+00	2026-06-25 13:53:48.554559+00	{"eTag": "\\"e91000d752245d4a0373d60f7779e10d\\"", "size": 219546, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:53:49.000Z", "contentLength": 219546, "httpStatusCode": 200}	132e4c11-98fa-47e2-8eb8-9b0c03a97ef4	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
457b1240-71c6-4545-b353-17a0e6ea8e9e	file_image	1782395718168-pet sart3.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:55:18.186841+00	2026-06-25 13:55:18.186841+00	2026-06-25 13:55:18.186841+00	{"eTag": "\\"727e3c73d67218808df70fb04dbe6551\\"", "size": 67603, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:55:19.000Z", "contentLength": 67603, "httpStatusCode": 200}	5f8d2f02-2907-4682-8648-e97da04019b1	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
23d85e1d-5c86-472c-8693-76c0f00ac970	file_image	1782395775293-pet  sart 4.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:56:15.293781+00	2026-06-25 13:56:15.293781+00	2026-06-25 13:56:15.293781+00	{"eTag": "\\"e8c8bcac5e55ab4460a0e7805975af35\\"", "size": 54640, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:56:16.000Z", "contentLength": 54640, "httpStatusCode": 200}	570844d7-5fb0-4175-b8e7-710481f1f764	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
cc05a841-a7f1-4c9e-a8eb-899e68b89e41	file_image	1782395833364-pet sart3.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:57:13.454345+00	2026-06-25 13:57:13.454345+00	2026-06-25 13:57:13.454345+00	{"eTag": "\\"38498c6824f608fc231377cc7e24cc09\\"", "size": 100491, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:57:14.000Z", "contentLength": 100491, "httpStatusCode": 200}	b4c31cea-eae0-47a7-8889-28aceb9af69a	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
ed95cfe1-656f-48bb-9344-09a2b8db78d0	file_image	1782396108276-pet sart 6.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 14:01:48.927359+00	2026-06-25 14:01:48.927359+00	2026-06-25 14:01:48.927359+00	{"eTag": "\\"20e1598d1223fff3013e1b7a48907cc7\\"", "size": 162705, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T14:01:49.000Z", "contentLength": 162705, "httpStatusCode": 200}	fb35894b-c5f4-489d-a69e-6e88b3196130	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
8ea16299-ed40-44ee-ae9d-29d5f1318a98	file_image	1782395848651-pet  sart 4.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:57:28.581343+00	2026-06-25 13:57:28.581343+00	2026-06-25 13:57:28.581343+00	{"eTag": "\\"4b87a05b1c622cf49186adfe35b443b6\\"", "size": 72039, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:57:29.000Z", "contentLength": 72039, "httpStatusCode": 200}	69e650a4-5702-43a6-974f-4e3f5f686744	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
7287b9f7-790c-44ef-84c5-bc7ea13dbc0e	file_image	1782395950999-pet  sart 5.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 13:59:11.036695+00	2026-06-25 13:59:11.036695+00	2026-06-25 13:59:11.036695+00	{"eTag": "\\"1315f4510479b359b50c933bd39ccc6f\\"", "size": 97702, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T13:59:11.000Z", "contentLength": 97702, "httpStatusCode": 200}	632c4dba-db3a-482b-82a3-95c51a5542ed	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
8645c35c-6565-44aa-a119-7346125d1128	file_image	1782396098203-pet sart7.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-25 14:01:38.320389+00	2026-06-25 14:01:38.320389+00	2026-06-25 14:01:38.320389+00	{"eTag": "\\"f340edc8b6249fdcd3d99c35dc53aac6\\"", "size": 140991, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T14:01:39.000Z", "contentLength": 140991, "httpStatusCode": 200}	23031499-311b-419b-9f0a-a77631ae3daa	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
4bd97747-b8e6-4218-b5d6-ebdd13f7c999	file_image	Jennie.png	\N	2026-06-25 17:58:19.155872+00	2026-06-25 17:58:19.155872+00	2026-06-25 17:58:19.155872+00	{"eTag": "\\"5198c41abdaedb9bf00f1007571e6c13-1\\"", "size": 187949, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-25T17:58:19.000Z", "contentLength": 187949, "httpStatusCode": 200}	30f5c5be-c3bf-4422-9e2e-61ba49b018dc	\N	\N
10edccf3-e893-4707-9eb3-96b38b8b90ee	file_image	1782438594558-pet  sart 5.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-26 01:49:55.167737+00	2026-06-26 01:49:55.167737+00	2026-06-26 01:49:55.167737+00	{"eTag": "\\"1315f4510479b359b50c933bd39ccc6f\\"", "size": 97702, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-26T01:49:56.000Z", "contentLength": 97702, "httpStatusCode": 200}	28fd896d-ace0-419b-b58e-7447206bfe6f	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
ac4b1f7f-a1c8-4e5a-8f7a-3e719b8723a5	file_image	1782438856167-download.png	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-06-26 01:54:16.867316+00	2026-06-26 01:54:16.867316+00	2026-06-26 01:54:16.867316+00	{"eTag": "\\"a3611927427a59256f7827db336f6727\\"", "size": 242046, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-26T01:54:17.000Z", "contentLength": 242046, "httpStatusCode": 200}	acc07cc3-5e81-45a6-aa29-4c7cb66d24db	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
d2f490fe-0a1a-4007-8d78-d72d6c128d81	file_image	1783264739966-a.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:19:01.173346+00	2026-07-05 15:19:01.173346+00	2026-07-05 15:19:01.173346+00	{"eTag": "\\"e8143e9ab0878421ef1f4b18af40f638\\"", "size": 60056, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T15:19:02.000Z", "contentLength": 60056, "httpStatusCode": 200}	26e3e99a-b02e-4ab8-9755-63351775c502	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
c2e2072c-5e1a-4b83-9d5f-05699f8fe0f0	file_image	1783264953674-b.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:22:34.786042+00	2026-07-05 15:22:34.786042+00	2026-07-05 15:22:34.786042+00	{"eTag": "\\"9e641f681394f7cba72a0c7a25581905\\"", "size": 24655, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T15:22:35.000Z", "contentLength": 24655, "httpStatusCode": 200}	4f7d0cc5-82c8-4d5f-84c3-e9b6e94e2843	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
5f240287-0656-4149-8706-e959ea10b692	file_image	1783264978342-b.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:22:59.592078+00	2026-07-05 15:22:59.592078+00	2026-07-05 15:22:59.592078+00	{"eTag": "\\"9e641f681394f7cba72a0c7a25581905\\"", "size": 24655, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T15:23:00.000Z", "contentLength": 24655, "httpStatusCode": 200}	cc151250-5501-4576-9f16-859e5411c269	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
8aedef19-a047-4aef-a5fa-67f7ed23bfd3	file_image	1783265205552-c.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:26:46.638159+00	2026-07-05 15:26:46.638159+00	2026-07-05 15:26:46.638159+00	{"eTag": "\\"22451c5072301805cabfaaa22b05f994\\"", "size": 48146, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T15:26:47.000Z", "contentLength": 48146, "httpStatusCode": 200}	42d68cd1-3b15-4daf-a862-38be48c3651c	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
7057c1a2-9bd6-45f8-b43c-ff0639ebfb41	file_image	1783265265056-d.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:27:46.140044+00	2026-07-05 15:27:46.140044+00	2026-07-05 15:27:46.140044+00	{"eTag": "\\"46d0d7cd6e2d2f4d3502868f47afe724\\"", "size": 35111, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T15:27:47.000Z", "contentLength": 35111, "httpStatusCode": 200}	e390012a-d6f8-411b-953a-7a091c39d70f	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
eb1c5bb7-d0ed-47c3-9439-1b18d53afbdb	file_image	1783265312957-e.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:28:34.086346+00	2026-07-05 15:28:34.086346+00	2026-07-05 15:28:34.086346+00	{"eTag": "\\"8e416df0557cd2bdfbe6ccac4e24c197\\"", "size": 46526, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T15:28:35.000Z", "contentLength": 46526, "httpStatusCode": 200}	a3cf9be7-379a-4dbb-9910-48d84d045239	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
7fdf1e50-5bc2-4048-9300-398e69129d31	file_image	1783265388650-f.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:29:49.797709+00	2026-07-05 15:29:49.797709+00	2026-07-05 15:29:49.797709+00	{"eTag": "\\"ec115a57cae2728cd185f820afc2ea1e\\"", "size": 40684, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T15:29:50.000Z", "contentLength": 40684, "httpStatusCode": 200}	7c8396f9-1320-4d60-918f-52d9b12e041a	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
0b0f33d6-8fec-4c14-890a-2c67d2323807	file_image	1783265574724-a.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:32:55.984639+00	2026-07-05 15:32:55.984639+00	2026-07-05 15:32:55.984639+00	{"eTag": "\\"f3bf9249595849811b4ea1e0041e1aab\\"", "size": 113387, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T15:32:56.000Z", "contentLength": 113387, "httpStatusCode": 200}	c37261bb-b258-41f8-8da1-d1d66911d15f	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
123ee5ec-1655-45c3-8fd6-25b897df6f9b	file_image	1783266169698-a.jpg	e9154374-cb36-40e7-9f3e-c19f685b779d	2026-07-05 15:42:50.807213+00	2026-07-05 15:42:50.807213+00	2026-07-05 15:42:50.807213+00	{"eTag": "\\"3804104bb3fb68808156fb8e2cf71679\\"", "size": 37804, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T15:42:51.000Z", "contentLength": 37804, "httpStatusCode": 200}	d380e92e-fd64-4014-bbf3-469ad354576c	e9154374-cb36-40e7-9f3e-c19f685b779d	{}
ea885a43-9b5b-4f70-a2ea-4fa28bffeb5a	logo	logo.png	\N	2026-07-11 04:37:29.224871+00	2026-07-11 04:37:29.224871+00	2026-07-11 04:37:29.224871+00	{"eTag": "\\"9f0a30e8c2cb113ae17fd99530bafedc-1\\"", "size": 78229, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-11T04:37:29.000Z", "contentLength": 78229, "httpStatusCode": 200}	4e7cdc9a-c4db-45e8-b5b1-f7b58e500685	\N	\N
58abbd71-f2ba-4aec-8f0d-6dcbe88fd6a3	logo	chatbot.png	\N	2026-07-11 04:50:44.712023+00	2026-07-11 04:50:44.712023+00	2026-07-11 04:50:44.712023+00	{"eTag": "\\"db7515af6596f3b6f870c840c0115049-1\\"", "size": 196665, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-11T04:50:45.000Z", "contentLength": 196665, "httpStatusCode": 200}	7fac1a44-bd68-4a49-9635-6ea1fa56e421	\N	\N
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata", "metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."vector_indexes" ("id", "name", "bucket_id", "data_type", "dimension", "distance_metric", "metadata_configuration", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 630, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict ACSfXgHLDRNcIqRq7STojgpljMh26HHdcDFHkG3vT9hoFicFZCz7KYdOoiILf6l

RESET ALL;
