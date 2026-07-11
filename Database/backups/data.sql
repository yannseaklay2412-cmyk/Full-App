SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict KW8dXcfuVskeQk1u31kxrZKHwcgsjPzTTeMEvh1lyaeGQixt511H6TOmezSSgcc

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
-- PostgreSQL database dump complete
--

-- \unrestrict KW8dXcfuVskeQk1u31kxrZKHwcgsjPzTTeMEvh1lyaeGQixt511H6TOmezSSgcc

RESET ALL;
