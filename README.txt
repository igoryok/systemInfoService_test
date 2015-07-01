App starting:

1) Clone the project.
2) Open with i.e WebStorm ide
3) run 'npm install'
4) install PostgreSQL with folowing creds 'postgres/postgres'
5) Create 'node_system_info' db 
6) Create table with following query
 CREATE TABLE public.memcpu ( 
       			id serial not null,
       			createdAt date,
       			cpu integer,
       			memory integer, 
       			CONSTRAINT pk_memcpu PRIMARY KEY (id))
       			WITH (OIDS = FALSE);
 ALTER TABLE public.memcpu OWNER TO postgres;

7) Start project 'npm start'


REST API:
http://localhost:3000/           - Express home page to be shure app works fine 
http://localhost:3000/summary    - agregated System Statistic
http://localhost:3000/systemInfo - system info which was saved in DB
http://localhost:3000/cpuLoad    - current time CPU loading


See screens of working project and result of REST response:
http://gyazo.com/13c28abf0716c53d7c0fb234a3d60ae3
http://gyazo.com/53673d79a0e8b5d16f42ed427af574bf
http://gyazo.com/90648ac775d4169ce224449555f99d00
http://gyazo.com/e430dd79aca0908a24dfdf9bc54d7494


Response example for egregated statistic:

[
	{
		"interval":["2015-06-30T09:00:00.000Z","2015-06-30T09:59:59.000Z"],
		"cpu":{
			"min":1,
			"max":40,
			"avg":"8.01"},
		"memory":{
			"min":4136028,
			"max":4234568,
			"avg":"4157022.75"}
	},
...
]


