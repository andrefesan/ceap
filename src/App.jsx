import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ReferenceLine } from "recharts";

const RAW_DATA = [{"num":11,"desc":"Aluguel do Escritório Político","comp":"2025-07-01","natureza":"3.1 LOCAÇÃO DE IMÓVEIS","valor":4000,"pagamento":"2025-08-13","vencimento":"2025-08-05","status":"PAGO","ressarcido":4000,"dataRess":"2025-08-18","bsb":"2025-08-05","fixa":"SIM"},{"num":12,"desc":"Serviço de Vigilância (Fatura VIGIACRE)","comp":"2025-07-01","natureza":"9 - SEGURANÇA","valor":360,"pagamento":"2025-07-22","vencimento":"2025-08-05","status":"PAGO","ressarcido":360,"dataRess":"2025-08-15","bsb":"2025-08-05","fixa":"SIM"},{"num":13,"desc":"Serviços de Divulgação do mandato (AC24 HORAS)","comp":"2025-07-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2025-07-12","vencimento":"2025-08-10","status":"PAGO","ressarcido":5000,"dataRess":"2025-08-11","bsb":"2025-08-05","fixa":"SIM"},{"num":14,"desc":"Serviços de Divulgação do mandato (AC24 HORAS EXPOACRE)","comp":"2025-07-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":10000,"pagamento":"2025-08-10","vencimento":"2025-08-10","status":"PAGO","ressarcido":10000,"dataRess":"2025-08-11","bsb":"2025-08-05","fixa":"SIM"},{"num":15,"desc":"Serviços de Divulgação do mandato (FOLHA DO ACRE GINA)","comp":"2025-07-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-07-12","vencimento":"2025-08-10","status":"PAGO","ressarcido":1500,"dataRess":"2025-08-12","bsb":"2025-08-05","fixa":"SIM"},{"num":16,"desc":"Serviços de Divulgação do mandato (PORTAL DO ROSAS)","comp":"2025-07-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3000,"pagamento":"2025-07-12","vencimento":"2025-08-10","status":"PAGO","ressarcido":3000,"dataRess":"2025-08-12","bsb":"2025-08-05","fixa":"SIM"},{"num":17,"desc":"Serviços de Divulgação do mandato (BLOG DO CRICA)","comp":"2025-07-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":2500,"pagamento":"2025-07-12","vencimento":"2025-08-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":"2025-08-05","fixa":"SIM"},{"num":18,"desc":"Serviços de Divulgação do mandato (ASTÉRIO MOREIRA)","comp":"2025-07-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":2500,"pagamento":"2025-07-12","vencimento":"2025-08-10","status":"PAGO","ressarcido":2500,"dataRess":"2025-08-29","bsb":"2025-08-05","fixa":"SIM"},{"num":19,"desc":"Fatura Internet (SEM FRONTEIRAS)","comp":"2025-07-01","natureza":"3.7 INTERNET","valor":119.9,"pagamento":"2025-08-11","vencimento":"2025-08-11","status":"PAGO","ressarcido":119.9,"dataRess":"2025-08-29","bsb":"2025-08-05","fixa":"SIM"},{"num":20,"desc":"Fatura Telefone (CLARO JUNHO)","comp":"2025-07-01","natureza":"2 - TELEFONIA","valor":64.9,"pagamento":"2025-07-07","vencimento":"2025-08-10","status":"PAGO","ressarcido":64.9,"dataRess":"2025-08-18","bsb":"2025-08-05","fixa":"SIM"},{"num":21,"desc":"Fatura Energia (ENERGISA JULHO)","comp":"2025-07-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":250.33,"pagamento":"2025-07-16","vencimento":"2025-07-17","status":"PAGO","ressarcido":250.33,"dataRess":"2025-08-15","bsb":"2025-08-05","fixa":"SIM"},{"num":22,"desc":"Fatura Água e Esgoto (SAERB Junho)","comp":"2025-07-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":156.01,"pagamento":"2025-07-03","vencimento":"2025-07-16","status":"PAGO","ressarcido":156.01,"dataRess":"2025-08-18","bsb":"2025-08-05","fixa":"SIM"},{"num":23,"desc":"Fatura Água e Esgoto (SAERB Maio)","comp":"2025-07-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":3.54,"pagamento":"2025-07-03","vencimento":"2025-06-12","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":"2025-08-05","fixa":"NÃO"},{"num":24,"desc":"IPTU 3/8","comp":"2025-07-01","natureza":"3.3 IPTU/Seguro contra incêndio","valor":642.96,"pagamento":"2025-06-17","vencimento":"2025-07-31","status":"PAGO","ressarcido":541,"dataRess":"2025-08-21","bsb":"2025-08-05","fixa":"NÃO"},{"num":25,"desc":"IPTU 4/8","comp":"2025-07-01","natureza":"3.3 IPTU/Seguro contra incêndio","valor":570.14,"pagamento":"2025-07-31","vencimento":"2025-07-31","status":"PAGO","ressarcido":486.93,"dataRess":"2025-08-18","bsb":"2025-08-05","fixa":"NÃO"},{"num":26,"desc":"Supabase (hospedagem site - $25) Julho - Tissia","comp":"2025-07-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":143.28,"pagamento":"2025-08-12","vencimento":"2025-08-02","status":"PAGO","ressarcido":141.73,"dataRess":"2025-08-18","bsb":"2025-08-05","fixa":"SIM"},{"num":27,"desc":"Auto Porto Rosellão","comp":"2025-07-01","natureza":"8 - COMBUSTÍVEIS E LUBRIFICANTES","valor":3154.09,"pagamento":"2025-07-29","vencimento":"2025-07-29","status":"PAGO","ressarcido":3154.09,"dataRess":"2025-08-11","bsb":"2025-08-05","fixa":"SIM"},{"num":28,"desc":"Posto Santana","comp":"2025-07-01","natureza":"8 - COMBUSTÍVEIS E LUBRIFICANTES","valor":6070.44,"pagamento":"2025-07-29","vencimento":"2025-07-29","status":"PAGO","ressarcido":6070.44,"dataRess":"2025-08-11","bsb":"2025-08-05","fixa":"SIM"},{"num":29,"desc":"LOCAÇÃO AMAROK","comp":"2025-07-01","natureza":"7.2 LOCAÇÃO OU FRETE DE AUTOMOTORES","valor":8000,"pagamento":null,"vencimento":"2025-07-31","status":"PAGO","ressarcido":8000,"dataRess":"2025-08-13","bsb":"2025-08-05","fixa":"SIM"},{"num":30,"desc":"DOMÍNIO zeadriano.com.br 2 ANOS - Tissia","comp":"2025-07-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":76,"pagamento":"2025-07-02","vencimento":"2025-07-02","status":"PAGO","ressarcido":76,"dataRess":"2025-08-21","bsb":"2025-08-05","fixa":"NÃO"},{"num":31,"desc":"Claro Brasília","comp":"2025-07-01","natureza":"3.8 ASSINATURA DE TV A CABO","valor":99.82,"pagamento":null,"vencimento":"2025-07-31","status":"PAGO","ressarcido":99.82,"dataRess":"2025-08-14","bsb":"2025-08-05","fixa":"SIM"},{"num":32,"desc":"BANNER (Faixa em lona 400x150)","comp":"2025-07-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":420,"pagamento":"2025-08-12","vencimento":"2025-08-12","status":"PAGO","ressarcido":420,"dataRess":"2025-08-15","bsb":"2025-08-05","fixa":"NÃO"},{"num":33,"desc":"Aluguel do Escritório Político","comp":"2025-08-01","natureza":"3.5 LOCAÇÃO DE IMÓVEIS/EQUIPAMENTOS","valor":4000,"pagamento":"2025-09-04","vencimento":"2025-09-05","status":"PAGO","ressarcido":4000,"dataRess":"2025-09-04","bsb":"2025-08-28","fixa":"SIM"},{"num":34,"desc":"Serviço de Vigilância (Fatura VIGIACRE)","comp":"2025-08-01","natureza":"9 - SEGURANÇA","valor":360,"pagamento":"2025-09-07","vencimento":"2025-09-05","status":"PAGO","ressarcido":360,"dataRess":"2025-09-04","bsb":"2025-08-28","fixa":"SIM"},{"num":35,"desc":"Serviços de Divulgação do mandato (Dora - O ALTO ACRE)","comp":"2025-08-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-09-03","vencimento":"2025-09-10","status":"PAGO","ressarcido":1500,"dataRess":"2025-09-02","bsb":"2025-08-28","fixa":"SIM"},{"num":36,"desc":"Serviços de Divulgação do mandato (AC24 HORAS)","comp":"2025-08-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2025-09-03","vencimento":"2025-09-10","status":"PAGO","ressarcido":5000,"dataRess":"2025-09-02","bsb":"2025-08-28","fixa":"SIM"},{"num":37,"desc":"Serviços de Divulgação do mandato (Gina - FOLHA DO ACRE)","comp":"2025-08-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-09-03","vencimento":"2025-09-10","status":"PAGO","ressarcido":1500,"dataRess":"2025-09-02","bsb":"2025-08-28","fixa":"SIM"},{"num":38,"desc":"Serviços de Divulgação do mandato (PORTAL DO ROSAS)","comp":"2025-08-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3000,"pagamento":"2025-09-03","vencimento":"2025-09-10","status":"PAGO","ressarcido":3000,"dataRess":"2025-09-02","bsb":"2025-08-28","fixa":"SIM"},{"num":39,"desc":"Serviços de Divulgação do mandato (BLOG DO CRICA)","comp":"2025-08-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3500,"pagamento":"2025-09-04","vencimento":"2025-09-10","status":"PAGO","ressarcido":3500,"dataRess":"2025-09-05","bsb":"2025-08-28","fixa":"SIM"},{"num":40,"desc":"Serviços de Divulgação do mandato (ASTÉRIO MOREIRA)","comp":"2025-08-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":4000,"pagamento":"2025-09-04","vencimento":"2025-09-10","status":"PAGO","ressarcido":4000,"dataRess":"2025-09-05","bsb":"2025-08-28","fixa":"SIM"},{"num":41,"desc":"Serviços de Divulgação do mandato (EPOP)","comp":"2025-07-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":12000,"pagamento":"2025-09-10","vencimento":"2025-09-10","status":"PAGO","ressarcido":12000,"dataRess":"2025-08-29","bsb":"2025-08-05","fixa":"SIM"},{"num":42,"desc":"Fatura Internet (SEM FRONTEIRAS)","comp":"2025-08-01","natureza":"3.7 INTERNET","valor":119.9,"pagamento":"2025-09-08","vencimento":"2025-09-09","status":"PAGO","ressarcido":119.9,"dataRess":"2025-09-26","bsb":"2025-09-23","fixa":"SIM"},{"num":43,"desc":"Fatura Telefone (CLARO JULHO)","comp":"2025-08-01","natureza":"2 - TELEFONIA","valor":71.33,"pagamento":"2025-08-11","vencimento":"2025-08-10","status":"PAGO","ressarcido":71.33,"dataRess":"2025-09-26","bsb":"2025-09-23","fixa":"SIM"},{"num":44,"desc":"Fatura Telefone (CLARO AGOSTO)","comp":"2025-08-01","natureza":"2 - TELEFONIA","valor":5.49,"pagamento":"2025-09-03","vencimento":"2025-09-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":"2025-09-23","fixa":"SIM"},{"num":45,"desc":"Fatura Energia (ENERGISA)","comp":"2025-08-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":383.65,"pagamento":"2025-08-12","vencimento":"2025-09-17","status":"PAGO","ressarcido":383.65,"dataRess":"2025-09-26","bsb":"2025-09-23","fixa":"SIM"},{"num":46,"desc":"Fatura Água e Esgoto (SAERB JULHO)","comp":"2025-07-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":3.64,"pagamento":"2025-08-11","vencimento":"2025-08-15","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"NÃO"},{"num":47,"desc":"Fatura Água e Esgoto (SAERB AGOSTO)","comp":"2025-08-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":156.01,"pagamento":"2025-09-02","vencimento":"2025-09-02","status":"PAGO","ressarcido":156.01,"dataRess":"2025-09-26","bsb":"2025-09-23","fixa":"SIM"},{"num":48,"desc":"IPTU 5/8","comp":"2025-08-01","natureza":"3.3 IPTU/Seguro contra incêndio","valor":570.14,"pagamento":"2025-08-29","vencimento":"2025-08-29","status":"PAGO","ressarcido":486.93,"dataRess":"2025-09-26","bsb":"2025-09-23","fixa":"SIM"},{"num":49,"desc":"Supabase (hospedagem site - $25) Agosto - Tissia","comp":"2025-08-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":145.71,"pagamento":"2025-08-12","vencimento":"2025-09-02","status":"PAGO","ressarcido":144.13,"dataRess":"2025-10-01","bsb":"2025-09-23","fixa":"SIM"},{"num":50,"desc":"COMBUSTÍVEL (3245,48 | 6102,42) = R$ 9.347,90","comp":"2025-08-01","natureza":"8 - COMBUSTÍVEIS E LUBRIFICANTES","valor":6102.42,"pagamento":null,"vencimento":"2025-08-25","status":"PAGO","ressarcido":6102.42,"dataRess":"2025-09-05","bsb":"2025-08-28","fixa":"SIM"},{"num":51,"desc":"LOCAÇÃO AMAROK","comp":"2025-08-01","natureza":"7.2 LOCAÇÃO OU FRETE DE AUTOMOTORES","valor":8000,"pagamento":null,"vencimento":"2025-08-30","status":"PAGO","ressarcido":8000,"dataRess":"2025-09-02","bsb":"2025-08-28","fixa":"SIM"},{"num":52,"desc":"Serviços Prestados (Fáber, Régis, Gleidiane)","comp":"2025-08-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":6000,"pagamento":"2025-09-03","vencimento":"2025-09-10","status":"PAGO","ressarcido":6000,"dataRess":"2025-09-02","bsb":"2025-08-28","fixa":"SIM"},{"num":64,"desc":"Serviços de Divulgação do mandato (Sérgio)","comp":"2025-08-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2025-09-03","vencimento":"2025-09-10","status":"PAGO","ressarcido":5000,"dataRess":"2025-09-04","bsb":"2025-08-28","fixa":"SIM"},{"num":65,"desc":"Gráfica Estrela - 4 mil unidades de informativo","comp":"2025-08-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":6600,"pagamento":"2025-09-08","vencimento":"2025-09-10","status":"PAGO","ressarcido":6600,"dataRess":"2025-09-05","bsb":"2025-08-28","fixa":"NÃO"},{"num":66,"desc":"6 faixas em lona medindo 6,0x0,80","comp":"2025-08-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1380,"pagamento":"2025-09-04","vencimento":"2025-09-10","status":"PAGO","ressarcido":1380,"dataRess":"2025-09-05","bsb":"2025-08-28","fixa":"NÃO"},{"num":70,"desc":"Fatura Internet (SEM FRONTEIRAS)","comp":"2025-09-01","natureza":"3.7 INTERNET","valor":122.44,"pagamento":"2025-10-13","vencimento":"2025-10-11","status":"PAGO","ressarcido":119.9,"dataRess":"2025-10-27","bsb":"2025-10-22","fixa":"SIM"},{"num":72,"desc":"Fatura Energia (ENERGISA)","comp":"2025-09-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":360.76,"pagamento":"2025-09-18","vencimento":"2025-09-18","status":"PAGO","ressarcido":360.76,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":86,"desc":"Supabase (hospedagem site - $25) Setembro - Tissia","comp":"2025-09-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":142.99,"pagamento":"2025-09-24","vencimento":null,"status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":88,"desc":"Aluguel do Escritório Político","comp":"2025-09-01","natureza":"3.5 LOCAÇÃO DE IMÓVEIS/EQUIPAMENTOS","valor":4000,"pagamento":"2025-10-07","vencimento":"2025-10-05","status":"PAGO","ressarcido":4000,"dataRess":"2001-10-07","bsb":"2025-09-29","fixa":"SIM"},{"num":89,"desc":"Serviço de Vigilância (Fatura VIGIACRE)","comp":"2025-09-01","natureza":"9 - SEGURANÇA","valor":367.92,"pagamento":"2025-10-09","vencimento":"2025-10-05","status":"PAGO","ressarcido":360,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":90,"desc":"Serviços de Divulgação do mandato (Dora - O ALTO ACRE)","comp":"2025-09-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-10-03","vencimento":"2025-10-10","status":"PAGO","ressarcido":1500,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":91,"desc":"Serviços de Divulgação do mandato (AC24 HORAS)","comp":"2025-09-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2025-10-03","vencimento":"2025-10-10","status":"PAGO","ressarcido":5000,"dataRess":"2001-10-02","bsb":"2025-09-26","fixa":"SIM"},{"num":92,"desc":"Serviços de Divulgação do mandato (Gina - FOLHA DO ACRE)","comp":"2025-09-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-09-30","vencimento":"2025-10-10","status":"PAGO","ressarcido":1500,"dataRess":"2001-10-02","bsb":"2025-09-26","fixa":"SIM"},{"num":93,"desc":"Serviços de Divulgação do mandato (PORTAL DO ROSAS)","comp":"2025-09-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3000,"pagamento":"2025-10-03","vencimento":"2025-10-10","status":"PAGO","ressarcido":3000,"dataRess":"2025-09-29","bsb":"2025-09-26","fixa":"SIM"},{"num":94,"desc":"Serviços de Divulgação do mandato (BLOG DO CRICA)","comp":"2025-09-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3500,"pagamento":"2025-10-06","vencimento":"2025-10-10","status":"PAGO","ressarcido":3500,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":95,"desc":"Serviços de Divulgação do mandato (ASTÉRIO MOREIRA)","comp":"2025-09-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":4000,"pagamento":"2025-10-06","vencimento":"2025-10-10","status":"PAGO","ressarcido":4000,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":96,"desc":"Fatura Água e Esgoto (SAERB SETEMBRO)","comp":"2025-09-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":156.01,"pagamento":"2025-09-24","vencimento":"2025-10-02","status":"PAGO","ressarcido":156.01,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":97,"desc":"IPTU 6/8","comp":"2025-09-01","natureza":"3.3 IPTU/Seguro contra incêndio","valor":570.14,"pagamento":"2025-09-30","vencimento":"2025-09-29","status":"PAGO","ressarcido":559.74,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":98,"desc":"COMBUSTÍVEL | MAXIMO = R$ 9.347,90","comp":"2025-09-01","natureza":"8 - COMBUSTÍVEIS E LUBRIFICANTES","valor":9334.84,"pagamento":null,"vencimento":"2025-09-25","status":"PAGO","ressarcido":9334.84,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":99,"desc":"LOCAÇÃO AMAROK","comp":"2025-09-01","natureza":"7.2 LOCAÇÃO OU FRETE DE AUTOMOTORES","valor":8000,"pagamento":null,"vencimento":"2025-09-30","status":"PAGO","ressarcido":8000,"dataRess":"2001-10-02","bsb":"2025-09-26","fixa":"SIM"},{"num":100,"desc":"Serviços Prestados (Fáber, Régis, Gleidiane)","comp":"2025-09-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":6000,"pagamento":"2025-10-07","vencimento":"2025-10-10","status":"PAGO","ressarcido":6000,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":101,"desc":"Serviços Prestados (André Ferreira Santana)","comp":"2025-09-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-10-07","vencimento":"2025-10-10","status":"PAGO","ressarcido":1500,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":103,"desc":"Serviços de Divulgação do mandato (Sérgio)","comp":"2025-09-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2025-10-03","vencimento":"2025-10-10","status":"PAGO","ressarcido":5000,"dataRess":"2001-10-03","bsb":"2025-09-29","fixa":"SIM"},{"num":105,"desc":"LIVRETOS","comp":"2025-09-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":6000,"pagamento":"2025-09-23","vencimento":"2025-10-10","status":"PAGO","ressarcido":6000,"dataRess":"2025-10-06","bsb":"2025-09-29","fixa":"NÃO"},{"num":109,"desc":"Material de Limpeza - Tissia","comp":"2025-09-01","natureza":"3.6 MATERIAL DE EXPEDIENTE","valor":112.71,"pagamento":"2025-10-07","vencimento":"2025-10-05","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":"2025-09-29","fixa":"NÃO"},{"num":110,"desc":"Controle VIGIACRE","comp":"2025-09-01","natureza":"9 - SEGURANÇA","valor":50,"pagamento":"2025-09-30","vencimento":"2025-10-13","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":"2025-09-29","fixa":"NÃO"},{"num":111,"desc":"Fatura Telefone (CLARO SETEMBRO)","comp":"2025-09-01","natureza":"2 - TELEFONIA","valor":69.8,"pagamento":"2025-09-30","vencimento":"2025-10-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":"2025-10-22","fixa":"SIM"},{"num":112,"desc":"Hotel - Tissia","comp":"2025-09-01","natureza":"6 - HOSPEDAGEM","valor":2064.54,"pagamento":"2025-10-07","vencimento":"2025-10-05","status":"PAGO","ressarcido":2064.54,"dataRess":"2025-10-08","bsb":"2025-09-30","fixa":"NÃO"},{"num":117,"desc":"Claro Brasília","comp":"2025-09-01","natureza":"3.7 INTERNET","valor":99,"pagamento":null,"vencimento":"31/09/2025","status":"PAGO","ressarcido":99.9,"dataRess":"2001-10-03","bsb":null,"fixa":"SIM"},{"num":118,"desc":"Restaurante das Minas - BSB","comp":"2025-09-01","natureza":"5 - ALIMENTAÇÃO DO PARLAMENTAR","valor":51.51,"pagamento":null,"vencimento":"31/09/2025","status":"PAGO","ressarcido":51.51,"dataRess":"2001-10-03","bsb":null,"fixa":"NÃO"},{"num":131,"desc":"Fatura Energia (ENERGISA)","comp":"2025-10-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":432.08,"pagamento":"2025-10-14","vencimento":"2025-10-16","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":"2025-10-28","fixa":"SIM"},{"num":132,"desc":"Fatura Internet (SEM FRONTEIRAS)","comp":"2025-10-01","natureza":"3.7 INTERNET","valor":119.9,"pagamento":"2025-10-31","vencimento":"2025-11-11","status":"PAGO","ressarcido":119.9,"dataRess":"2025-11-26","bsb":"2025-11-17","fixa":"SIM"},{"num":133,"desc":"Aluguel do Escritório Político","comp":"2025-10-01","natureza":"3.5 LOCAÇÃO DE IMÓVEIS/EQUIPAMENTOS","valor":4000,"pagamento":"2025-11-05","vencimento":"2025-11-05","status":"PAGO","ressarcido":4000,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":134,"desc":"Serviço de Vigilância (Fatura VIGIACRE)","comp":"2025-10-01","natureza":"9 - SEGURANÇA","valor":360,"pagamento":"2025-10-31","vencimento":"2025-11-05","status":"PAGO","ressarcido":360,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":135,"desc":"Serviços de Divulgação do mandato (Dora - O ALTO ACRE)","comp":"2025-10-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-10-31","vencimento":"2025-11-10","status":"PAGO","ressarcido":1500,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":136,"desc":"Serviços de Divulgação do mandato (AC24 HORAS)","comp":"2025-10-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2025-11-05","vencimento":"2025-11-10","status":"PAGO","ressarcido":5000,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":137,"desc":"Serviços de Divulgação do mandato (Gina - FOLHA DO ACRE)","comp":"2025-10-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-10-31","vencimento":"2025-11-10","status":"PAGO","ressarcido":1500,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":138,"desc":"Serviços de Divulgação do mandato (PORTAL DO ROSAS)","comp":"2025-10-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3000,"pagamento":"2025-11-04","vencimento":"2025-11-10","status":"PAGO","ressarcido":3000,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":139,"desc":"Serviços de Divulgação do mandato (BLOG DO CRICA)","comp":"2025-10-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3500,"pagamento":"2025-11-04","vencimento":"2025-11-10","status":"PAGO","ressarcido":3500,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":140,"desc":"Serviços de Divulgação do mandato (ASTÉRIO MOREIRA)","comp":"2025-10-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":4000,"pagamento":"2025-11-04","vencimento":"2025-11-10","status":"PAGO","ressarcido":4000,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":141,"desc":"Fatura Água e Esgoto (SAERB OUTUBRO)","comp":"2025-10-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":156.01,"pagamento":"2025-10-31","vencimento":"2025-11-03","status":"PAGO","ressarcido":156.01,"dataRess":"2025-11-26","bsb":"2025-11-17","fixa":"SIM"},{"num":142,"desc":"IPTU 7/8","comp":"2025-10-01","natureza":"3.3 IPTU/Seguro contra incêndio","valor":570.14,"pagamento":"2025-10-31","vencimento":"2025-10-29","status":"PAGO","ressarcido":486.93,"dataRess":"2025-11-26","bsb":"2025-11-17","fixa":"SIM"},{"num":143,"desc":"COMBUSTÍVEL | MAXIMO = R$ 9.347,90","comp":"2025-10-01","natureza":"8 - COMBUSTÍVEIS E LUBRIFICANTES","valor":9386.64,"pagamento":null,"vencimento":"2025-10-25","status":"PAGO","ressarcido":9386.64,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":144,"desc":"LOCAÇÃO AMAROK","comp":"2025-10-01","natureza":"7.2 LOCAÇÃO OU FRETE DE AUTOMOTORES","valor":8000,"pagamento":null,"vencimento":"2025-10-30","status":"PAGO","ressarcido":8000,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":145,"desc":"Serviços Prestados (Fáber, Régis, Gleidiane)","comp":"2025-10-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":6000,"pagamento":"2025-10-31","vencimento":"2025-11-10","status":"PAGO","ressarcido":6000,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":146,"desc":"Serviços Prestados (André Ferreira Santana)","comp":"2025-10-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-10-31","vencimento":"2025-11-10","status":"PAGO","ressarcido":1500,"dataRess":"2025-11-06","bsb":"2025-10-28","fixa":"SIM"},{"num":148,"desc":"Serviços de Divulgação do mandato (Sérgio)","comp":"2025-10-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2025-11-04","vencimento":"2025-11-10","status":"PAGO","ressarcido":5000,"dataRess":"2025-10-31","bsb":"2025-10-28","fixa":"SIM"},{"num":151,"desc":"Claro Brasília","comp":"2025-10-01","natureza":"3.7 INTERNET","valor":471,"pagamento":null,"vencimento":"2025-10-31","status":"PAGO","ressarcido":99.9,"dataRess":"2025-10-27","bsb":null,"fixa":"SIM"},{"num":154,"desc":"Supabase (hospedagem site - $25) Setembro - Tissia","comp":"2025-10-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":139.86,"pagamento":"2025-11-05","vencimento":"2025-11-10","status":"PAGO","ressarcido":138.34,"dataRess":"2025-12-12","bsb":"2025-11-17","fixa":"SIM"},{"num":155,"desc":"Supabase (hospedagem site - $25) Novembro - Andre","comp":"2025-11-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":146.28,"pagamento":"2025-11-06","vencimento":"2025-11-10","status":"PAGO","ressarcido":141.33,"dataRess":"2025-12-12","bsb":"2025-11-28","fixa":"SIM"},{"num":156,"desc":"Hostinger (Hospedagem do sistema de Posts) - Andre","comp":"2025-10-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":179.88,"pagamento":"2025-11-06","vencimento":"2025-11-10","status":"PAGO","ressarcido":179.88,"dataRess":"2025-12-01","bsb":"2025-11-17","fixa":"NÃO"},{"num":169,"desc":"Serviços de Divulgação do mandato (Dora - O ALTO ACRE)","comp":"2025-11-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-12-01","vencimento":"2025-12-10","status":"PAGO","ressarcido":1500,"dataRess":"2025-12-09","bsb":"2025-11-28","fixa":"SIM"},{"num":170,"desc":"Serviços de Divulgação do mandato (AC24 HORAS)","comp":"2025-11-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2025-12-04","vencimento":"2025-12-10","status":"PAGO","ressarcido":5000,"dataRess":"2025-11-28","bsb":"2025-11-28","fixa":"SIM"},{"num":171,"desc":"Serviços de Divulgação do mandato (Gina - FOLHA DO ACRE)","comp":"2025-11-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-12-01","vencimento":"2025-12-10","status":"PAGO","ressarcido":1500,"dataRess":"2025-12-03","bsb":"2025-11-28","fixa":"SIM"},{"num":172,"desc":"Serviços de Divulgação do mandato (PORTAL DO ROSAS)","comp":"2025-11-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3000,"pagamento":"2025-12-03","vencimento":"2025-12-10","status":"PAGO","ressarcido":3000,"dataRess":"2025-11-28","bsb":"2025-11-28","fixa":"SIM"},{"num":173,"desc":"Serviços de Divulgação do mandato (ASTÉRIO e CRICA)","comp":"2025-11-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":7500,"pagamento":"2025-12-03","vencimento":"2025-12-10","status":"PAGO","ressarcido":7500,"dataRess":"2025-12-04","bsb":"2025-11-28","fixa":"SIM"},{"num":174,"desc":"Serviços de Divulgação do mandato (Sérgio)","comp":"2025-11-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2025-12-03","vencimento":"2025-12-10","status":"PAGO","ressarcido":5000,"dataRess":"2025-12-04","bsb":"2025-11-28","fixa":"SIM"},{"num":176,"desc":"Serviços Prestados (Fáber, Régis, Gleidiane)","comp":"2025-11-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":6000,"pagamento":"2025-12-01","vencimento":"2025-12-10","status":"PAGO","ressarcido":6000,"dataRess":"2025-12-04","bsb":"2025-11-28","fixa":"SIM"},{"num":177,"desc":"Serviços Prestados (André Ferreira Santana)","comp":"2025-11-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2025-12-01","vencimento":"2025-12-10","status":"PAGO","ressarcido":1500,"dataRess":"2025-12-04","bsb":"2025-11-28","fixa":"SIM"},{"num":178,"desc":"Serviço de Vigilância (Fatura VIGIACRE)","comp":"2025-11-01","natureza":"9 - SEGURANÇA","valor":360,"pagamento":"2025-12-02","vencimento":"2025-12-05","status":"PAGO","ressarcido":360,"dataRess":"2025-12-03","bsb":"2025-11-28","fixa":"SIM"},{"num":179,"desc":"Aluguel do Escritório Político","comp":"2025-11-01","natureza":"3.5 LOCAÇÃO DE IMÓVEIS/EQUIPAMENTOS","valor":4000,"pagamento":"2025-12-02","vencimento":"2025-12-05","status":"PAGO","ressarcido":4000,"dataRess":"2025-12-03","bsb":"2025-11-28","fixa":"SIM"},{"num":182,"desc":"Fatura Energia (ENERGISA)","comp":"2025-11-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":435.91,"pagamento":"2025-11-10","vencimento":"2025-11-17","status":"PAGO","ressarcido":435.91,"dataRess":"2025-12-03","bsb":"2025-11-28","fixa":"SIM"},{"num":183,"desc":"Fatura Internet (SEM FRONTEIRAS)","comp":"2025-11-01","natureza":"3.7 INTERNET","valor":119.9,"pagamento":"2025-12-02","vencimento":"2025-12-11","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":185,"desc":"Fatura Claro Brasília","comp":"2025-11-01","natureza":"3.7 INTERNET","valor":99,"pagamento":null,"vencimento":"31/11/2025","status":"PAGO","ressarcido":99,"dataRess":"2025-12-01","bsb":null,"fixa":"SIM"},{"num":186,"desc":"COMBUSTÍVEL | MAXIMO = R$ 9.347,90","comp":"2025-11-01","natureza":"8 - COMBUSTÍVEIS E LUBRIFICANTES","valor":8463.55,"pagamento":null,"vencimento":"2025-11-25","status":"PAGO","ressarcido":8463.55,"dataRess":"2025-12-03","bsb":"2025-11-28","fixa":"SIM"},{"num":187,"desc":"LOCAÇÃO HILUX","comp":"2025-11-01","natureza":"7.2 LOCAÇÃO OU FRETE DE AUTOMOTORES","valor":18500,"pagamento":null,"vencimento":"2025-11-30","status":"PAGO","ressarcido":18500,"dataRess":"2025-11-28","bsb":"2025-11-28","fixa":"SIM"},{"num":188,"desc":"IPTU 8/8","comp":"2025-11-01","natureza":"3.3 IPTU/Seguro contra incêndio","valor":642.96,"pagamento":"2025-12-03","vencimento":"2025-11-29","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"NÃO"},{"num":193,"desc":"Impressão de livretos","comp":"2025-11-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3000,"pagamento":"2025-12-05","vencimento":"2025-11-11","status":"PAGO","ressarcido":3000,"dataRess":"2025-11-17","bsb":"2025-11-14","fixa":"NÃO"},{"num":213,"desc":"Supabase Novembro - André","comp":"2025-11-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":166.74,"pagamento":"2025-12-17","vencimento":"2025-12-15","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":214,"desc":"Serviços de Divulgação do mandato (Dora - O ALTO ACRE)","comp":"2025-12-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2026-01-09","vencimento":"2026-01-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":215,"desc":"Serviços de Divulgação do mandato (AC24 HORAS)","comp":"2025-12-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2026-01-11","vencimento":"2026-01-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":217,"desc":"Serviços de Divulgação do mandato (PORTAL DO ROSAS)","comp":"2025-12-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3000,"pagamento":"2026-01-09","vencimento":"2026-01-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":218,"desc":"Serviços de Divulgação do mandato (ASTÉRIO e CRICA)","comp":"2025-12-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":7500,"pagamento":"2026-01-11","vencimento":"2026-01-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":219,"desc":"Serviços de Divulgação do mandato (Sérgio)","comp":"2025-12-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2026-01-11","vencimento":"2026-01-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":221,"desc":"Serviços Prestados (Fáber, Régis, Gleidiane)","comp":"2025-12-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":6000,"pagamento":"2026-01-09","vencimento":"2026-01-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":222,"desc":"Serviços Prestados (André Ferreira Santana)","comp":"2025-12-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2026-01-09","vencimento":"2026-01-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":223,"desc":"Serviço de Vigilância (Fatura VIGIACRE)","comp":"2025-12-01","natureza":"9 - SEGURANÇA","valor":360,"pagamento":"2025-12-26","vencimento":"2026-01-05","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":224,"desc":"Aluguel do Escritório Político","comp":"2025-12-01","natureza":"3.5 LOCAÇÃO DE IMÓVEIS/EQUIPAMENTOS","valor":4000,"pagamento":"2026-01-10","vencimento":"2026-01-05","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":226,"desc":"Fatura Energia (ENERGISA)","comp":"2025-12-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":406.81,"pagamento":"2025-12-17","vencimento":"2025-12-18","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":227,"desc":"Fatura Água e Esgoto (SAERB DEZEMBRO)","comp":"2025-12-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":156.01,"pagamento":"2025-12-26","vencimento":"2025-12-26","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":228,"desc":"Fatura Internet (SEM FRONTEIRAS)","comp":"2025-12-01","natureza":"3.7 INTERNET","valor":119.9,"pagamento":"2026-01-05","vencimento":"2026-01-09","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":229,"desc":"Fatura Telefone (CLARO OUTUBRO)","comp":"2025-12-01","natureza":"2 - TELEFONIA","valor":18.29,"pagamento":"2026-01-08","vencimento":"2026-01-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":230,"desc":"Fatura Claro Brasília","comp":"2025-12-01","natureza":"3.7 INTERNET","valor":471.6,"pagamento":"2026-01-23","vencimento":"2025-12-31","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":231,"desc":"COMBUSTÍVEL | MAXIMO = R$ 9.347,90","comp":"2025-12-01","natureza":"8 - COMBUSTÍVEIS E LUBRIFICANTES","valor":0,"pagamento":null,"vencimento":"2025-12-25","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":232,"desc":"LOCAÇÃO HILUX","comp":"2025-12-01","natureza":"7.2 LOCAÇÃO OU FRETE DE AUTOMOTORES","valor":18500,"pagamento":null,"vencimento":"2025-12-30","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":233,"desc":"Adobe Creative Cloud - André","comp":"2025-12-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":80,"pagamento":"2025-12-17","vencimento":"2026-12-15","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":253,"desc":"Supabase Dezembro - André","comp":"2025-12-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":209.09,"pagamento":"2026-01-05","vencimento":"2026-01-15","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":269,"desc":"OUTDOOR PARA DIVULGAÇÃO DAS ATIVIDADES","comp":"2026-01-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":8250,"pagamento":"2026-01-30","vencimento":"2026-02-20","status":"PAGO","ressarcido":8250,"dataRess":"2026-02-02","bsb":"2026-01-26","fixa":"NÃO"},{"num":271,"desc":"Serviços de Divulgação do mandato (Dora - O ALTO ACRE)","comp":"2026-01-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":null,"vencimento":"2026-02-10","status":"PAGO","ressarcido":1500,"dataRess":"2026-02-02","bsb":"2026-01-26","fixa":"SIM"},{"num":272,"desc":"Serviços de Divulgação do mandato (AC24 HORAS)","comp":"2026-01-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":null,"vencimento":"2026-02-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":273,"desc":"Serviços de Divulgação do mandato (Gina - FOLHA DO ACRE)","comp":"2026-01-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":null,"vencimento":"2026-02-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":274,"desc":"Serviços de Divulgação do mandato (PORTAL DO ROSAS)","comp":"2026-01-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3000,"pagamento":null,"vencimento":"2026-02-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":275,"desc":"Serviços de Divulgação do mandato (ASTÉRIO e CRICA)","comp":"2026-01-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":7500,"pagamento":null,"vencimento":"2026-02-10","status":"PAGO","ressarcido":7500,"dataRess":"2026-02-02","bsb":"2026-01-26","fixa":"SIM"},{"num":276,"desc":"Serviços de Divulgação do mandato (Sérgio)","comp":"2026-01-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":null,"vencimento":"2026-02-10","status":"PAGO","ressarcido":5000,"dataRess":"2026-02-02","bsb":"2026-01-26","fixa":"SIM"},{"num":277,"desc":"Serviços Prestados (Fáber, Régis, Gleidiane)","comp":"2026-01-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":6000,"pagamento":"2026-01-31","vencimento":"2026-02-10","status":"PAGO","ressarcido":6000,"dataRess":"2026-02-02","bsb":"2026-01-26","fixa":"SIM"},{"num":278,"desc":"Serviços Prestados (André Ferreira Santana)","comp":"2026-01-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":2500,"pagamento":"2026-01-31","vencimento":"2026-02-10","status":"PAGO","ressarcido":2500,"dataRess":"2026-02-02","bsb":"2026-01-26","fixa":"SIM"},{"num":279,"desc":"Serviço de Vigilância (Fatura VIGIACRE)","comp":"2026-01-01","natureza":"9 - SEGURANÇA","valor":360,"pagamento":"2026-01-30","vencimento":"2026-02-05","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":280,"desc":"Aluguel do Escritório Político","comp":"2026-01-01","natureza":"3.5 LOCAÇÃO DE IMÓVEIS/EQUIPAMENTOS","valor":4000,"pagamento":"2026-01-31","vencimento":"2026-02-05","status":"PAGO","ressarcido":4000,"dataRess":"2026-02-02","bsb":"2026-01-26","fixa":"SIM"},{"num":282,"desc":"Fatura Energia (ENERGISA)","comp":"2026-01-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":400.05,"pagamento":"2026-01-23","vencimento":"2026-01-17","status":"PAGO","ressarcido":400.05,"dataRess":"2026-02-02","bsb":"2026-01-26","fixa":"SIM"},{"num":283,"desc":"Fatura Água e Esgoto (SAERB JANEIRO)","comp":"2026-01-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":280.82,"pagamento":"2026-01-30","vencimento":"2026-02-02","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":284,"desc":"Fatura Internet (SEM FRONTEIRAS)","comp":"2026-01-01","natureza":"3.7 INTERNET","valor":119.9,"pagamento":"2026-01-30","vencimento":"2026-02-09","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":285,"desc":"Fatura Telefone (CLARO OUTUBRO)","comp":"2026-01-01","natureza":"2 - TELEFONIA","valor":69.8,"pagamento":"2026-01-30","vencimento":"2026-02-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":286,"desc":"Fatura Claro Brasília","comp":"2026-01-01","natureza":"3.7 INTERNET","valor":471.6,"pagamento":null,"vencimento":"2026-02-05","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":287,"desc":"COMBUSTÍVEL | MAXIMO = R$ 9.347,90","comp":"2026-01-01","natureza":"8 - COMBUSTÍVEIS E LUBRIFICANTES","valor":3352.56,"pagamento":null,"vencimento":"2025-12-25","status":"PAGO","ressarcido":3352.56,"dataRess":"2026-02-02","bsb":"2026-01-26","fixa":"SIM"},{"num":288,"desc":"LOCAÇÃO HILUX","comp":"2026-01-01","natureza":"7.2 LOCAÇÃO OU FRETE DE AUTOMOTORES","valor":18500,"pagamento":null,"vencimento":"2025-12-30","status":"PAGO","ressarcido":18500,"dataRess":"2026-02-02","bsb":"2026-01-26","fixa":"SIM"},{"num":289,"desc":"Supabase Janeiro - André","comp":"2026-01-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":210,"pagamento":"2026-01-31","vencimento":"2026-02-15","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":290,"desc":"Adobe Creative Cloud - André","comp":"2026-01-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":80,"pagamento":"2026-01-31","vencimento":"2026-02-15","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":322,"desc":"Serviços de Divulgação do mandato (Dora - O ALTO ACRE)","comp":"2026-02-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":null,"vencimento":"2026-03-10","status":"PAGO","ressarcido":1500,"dataRess":"2026-03-03","bsb":"2026-02-25","fixa":"SIM"},{"num":323,"desc":"Serviços de Divulgação do mandato (AC24 HORAS)","comp":"2026-02-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2026-03-04","vencimento":"2026-03-10","status":"PAGO","ressarcido":5000,"dataRess":"2026-02-27","bsb":"2026-02-25","fixa":"SIM"},{"num":324,"desc":"Serviços de Divulgação do mandato (Gina - FOLHA DO ACRE)","comp":"2026-02-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":1500,"pagamento":"2026-02-27","vencimento":"2026-03-10","status":"PAGO","ressarcido":1500,"dataRess":"2026-03-10","bsb":"2026-02-25","fixa":"SIM"},{"num":325,"desc":"Serviços de Divulgação do mandato (PORTAL DO ROSAS)","comp":"2026-02-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":3000,"pagamento":"2026-03-09","vencimento":"2026-03-10","status":"PAGO","ressarcido":3000,"dataRess":"2026-02-27","bsb":"2026-02-25","fixa":"SIM"},{"num":326,"desc":"Serviços de Divulgação do mandato (ASTÉRIO e CRICA)","comp":"2026-02-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":7500,"pagamento":"2026-03-09","vencimento":"2026-03-10","status":"PAGO","ressarcido":7500,"dataRess":"2026-03-13","bsb":"2026-02-25","fixa":"SIM"},{"num":327,"desc":"Serviços de Divulgação do mandato (Sérgio)","comp":"2026-02-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":5000,"pagamento":"2026-03-04","vencimento":"2026-03-10","status":"PAGO","ressarcido":5000,"dataRess":"2026-03-04","bsb":"2026-02-25","fixa":"SIM"},{"num":328,"desc":"Serviços Prestados (Fáber, Régis, Gleidiane)","comp":"2026-02-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":6000,"pagamento":"2026-03-04","vencimento":"2026-03-10","status":"PAGO","ressarcido":6000,"dataRess":"2026-03-04","bsb":"2026-02-25","fixa":"SIM"},{"num":329,"desc":"Serviços Prestados (André Ferreira Santana)","comp":"2026-02-01","natureza":"10 - MARKETING ATIVIDADE PARLAMENTAR","valor":2500,"pagamento":"2026-03-04","vencimento":"2026-03-10","status":"PAGO","ressarcido":2500,"dataRess":"2026-03-04","bsb":"2026-02-25","fixa":"SIM"},{"num":330,"desc":"Serviço de Vigilância (Fatura VIGIACRE)","comp":"2026-02-01","natureza":"9 - SEGURANÇA","valor":360,"pagamento":"2026-02-27","vencimento":"2026-03-05","status":"PAGO","ressarcido":360,"dataRess":"2026-03-04","bsb":"2026-02-25","fixa":"SIM"},{"num":331,"desc":"Aluguel do Escritório Político","comp":"2026-02-01","natureza":"3.5 LOCAÇÃO DE IMÓVEIS/EQUIPAMENTOS","valor":4000,"pagamento":"2026-03-11","vencimento":"2026-03-05","status":"PAGO","ressarcido":4000,"dataRess":"2026-03-04","bsb":"2026-02-25","fixa":"SIM"},{"num":333,"desc":"Fatura Energia (ENERGISA)","comp":"2026-02-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":563.67,"pagamento":"2026-02-11","vencimento":"2026-02-18","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":"2026-02-25","fixa":"SIM"},{"num":334,"desc":"Fatura Água e Esgoto (SAERB FEVEREIRO)","comp":"2026-02-01","natureza":"3.4 ENERGIA/ÁGUA E ESGOTO","valor":280.82,"pagamento":null,"vencimento":"2026-03-13","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":335,"desc":"Fatura Internet (SEM FRONTEIRAS)","comp":"2026-02-01","natureza":"3.7 INTERNET","valor":119.9,"pagamento":null,"vencimento":"2026-03-09","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":336,"desc":"Fatura Telefone (CLARO FEVEREIRO)","comp":"2026-02-01","natureza":"2 - TELEFONIA","valor":69.8,"pagamento":null,"vencimento":"2026-03-10","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":337,"desc":"Fatura Claro Brasília","comp":"2026-02-01","natureza":"3.7 INTERNET","valor":22.28,"pagamento":null,"vencimento":"2026-03-05","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":338,"desc":"COMBUSTÍVEL | MAXIMO = R$ 9.347,90","comp":"2026-02-01","natureza":"8 - COMBUSTÍVEIS E LUBRIFICANTES","valor":8301.43,"pagamento":null,"vencimento":"2026-02-25","status":"PAGO","ressarcido":8301.43,"dataRess":"2026-03-04","bsb":"2026-02-25","fixa":"SIM"},{"num":339,"desc":"LOCAÇÃO HILUX","comp":"2026-02-01","natureza":"7.2 LOCAÇÃO OU FRETE DE AUTOMOTORES","valor":12000,"pagamento":null,"vencimento":"2026-02-25","status":"PAGO","ressarcido":12000,"dataRess":"2026-03-04","bsb":"2026-02-25","fixa":"SIM"},{"num":340,"desc":"Supabase Fevereiro - André","comp":"2026-02-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":47.96,"pagamento":"2026-03-11","vencimento":"2026-03-15","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"},{"num":341,"desc":"Adobe Creative Cloud - André","comp":"2026-02-01","natureza":"3.9 LICENÇAS DE SOFTWARE","valor":80,"pagamento":"2026-03-11","vencimento":"2026-03-15","status":"PAGO","ressarcido":null,"dataRess":null,"bsb":null,"fixa":"SIM"}];

const CEAP_ATE_FEV = 50426.26;
const CEAP_MARCO = 57359.87;
const PLUS_VEICULOS = 9485;
const LIM_COMBUSTIVEL = 9347.9;
const LIM_SEGURANCA = 8700;
const LIM_LOCACAO = 18970;

const MONTHS_LABEL = { "2025-07":"Jul/25","2025-08":"Ago/25","2025-09":"Set/25","2025-10":"Out/25","2025-11":"Nov/25","2025-12":"Dez/25","2026-01":"Jan/26","2026-02":"Fev/26" };

const fmt = (v) => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const fmtN = (v) => v.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
const pct = (v) => (v*100).toFixed(1)+"%";

function getMonth(d) { if (!d) return null; return d.substring(0,7); }

function categorize(item) {
  const d = item.desc.toLowerCase();
  const n = item.natureza.toLowerCase();
  // Marketing: divulgação, banners, livretos, faixas, gráfica, outdoor, impressão, EPOP
  if (d.includes("divulgação") || d.includes("banner") || d.includes("faixa") || d.includes("livreto") || d.includes("gráfica") || d.includes("grafica") || d.includes("outdoor") || d.includes("impressão") || d.includes("informativo") || d.includes("epop") || d.includes("sérgio") || d.includes("sergio")) return "marketing";
  // Equipe: somente "Serviços Prestados" com nomes da equipe (não inclui software no cartão do André)
  if (d.includes("serviços prestados") || d.includes("servicos prestados")) {
    if (d.includes("andré") || d.includes("andre") || d.includes("fáber") || d.includes("faber") || d.includes("régis") || d.includes("regis") || d.includes("gleidiane")) return "equipe";
  }
  // Administrativa: imóveis, utilidades, software (Supabase, Adobe, Hostinger, domínio), IPTU, material
  if (n.includes("locação de imóveis") || n.includes("iptu") || n.includes("energia") || n.includes("água") || n.includes("internet") || n.includes("telefonia") || n.includes("tv a cabo") || n.includes("licenças de software") || n.includes("material de expediente")) return "administrativa";
  // Operacional: combustível, locação veículos, segurança, hospedagem, alimentação
  if (n.includes("combustíveis") || n.includes("locação ou frete") || n.includes("segurança") || n.includes("hospedagem") || n.includes("alimentação")) return "operacional";
  return "administrativa";
}

function getEquipeMember(item) {
  const d = item.desc.toLowerCase();
  if (!d.includes("serviços prestados") && !d.includes("servicos prestados")) return null;
  if (d.includes("andré") || d.includes("andre")) return "André";
  if (d.includes("fáber") || d.includes("faber") || d.includes("régis") || d.includes("regis") || d.includes("gleidiane")) return "Fáber/Régis/Gleidiane";
  return null;
}

function getNaturezaShort(n) {
  if (n.includes("MARKETING")) return "Marketing";
  if (n.includes("COMBUSTÍVEIS")) return "Combustível";
  if (n.includes("LOCAÇÃO OU FRETE")) return "Loc. Veículos";
  if (n.includes("LOCAÇÃO DE IMÓVEIS") || n.includes("LOCAÇÃO DE IMÓVEIS/EQUIPAMENTOS")) return "Loc. Imóveis";
  if (n.includes("SEGURANÇA")) return "Segurança";
  if (n.includes("ENERGIA")) return "Energia/Água";
  if (n.includes("INTERNET")) return "Internet";
  if (n.includes("TELEFONIA")) return "Telefonia";
  if (n.includes("IPTU")) return "IPTU";
  if (n.includes("SOFTWARE")) return "Software";
  if (n.includes("HOSPEDAGEM")) return "Hospedagem";
  if (n.includes("ALIMENTAÇÃO")) return "Alimentação";
  if (n.includes("TV A CABO")) return "TV/Assinatura";
  if (n.includes("MATERIAL")) return "Mat. Expediente";
  return n.substring(0,20);
}

const COLORS = ["#0f766e","#b45309","#7c3aed","#dc2626","#0369a1","#c026d3","#15803d","#ea580c","#4338ca","#be185d","#0d9488","#d97706","#6d28d9","#e11d48"];

const CustomTooltip = ({active,payload,label}) => {
  if (!active||!payload) return null;
  return (
    <div style={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#e2e8f0"}}>
      <p style={{fontWeight:700,marginBottom:4}}>{label}</p>
      {payload.map((p,i)=>(<p key={i} style={{color:p.color||p.fill,margin:"2px 0"}}>{p.name}: {fmt(p.value)}</p>))}
    </div>
  );
};

export default function Dashboard() {
  const [tab, setTab] = useState("resumo");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const data = useMemo(() => RAW_DATA.filter(d => d.valor > 0), []);

  const months = useMemo(() => {
    const m = [...new Set(data.map(d => getMonth(d.comp)))].filter(Boolean).sort();
    return m;
  }, [data]);

  const filtered = useMemo(() => selectedMonth === "all" ? data : data.filter(d => getMonth(d.comp) === selectedMonth), [data, selectedMonth]);

  const monthlyData = useMemo(() => {
    const map = {};
    data.forEach(d => {
      const m = getMonth(d.comp);
      if (!m) return;
      if (!map[m]) map[m] = { total: 0, ressarcido: 0, items: [], fixas: 0, variaveis: 0, enviadas: 0, pendRessarc: 0, naoEnviadas: 0 };
      map[m].total += d.valor;
      map[m].ressarcido += d.ressarcido || 0;
      map[m].items.push(d);
      if (d.fixa === "SIM") map[m].fixas += d.valor; else map[m].variaveis += d.valor;
      if (d.bsb && d.ressarcido) map[m].enviadas++;
      else if (d.bsb && !d.ressarcido) map[m].pendRessarc++;
      else if (!d.bsb) map[m].naoEnviadas++;
    });
    return map;
  }, [data]);

  const chartMonthly = useMemo(() => months.map(m => {
    const md = monthlyData[m] || { total: 0, ressarcido: 0 };
    const ceap = m >= "2026-03" ? CEAP_MARCO + PLUS_VEICULOS : CEAP_ATE_FEV;
    return { mes: MONTHS_LABEL[m] || m, total: md.total, ressarcido: md.ressarcido, cota: ceap, saldo: ceap - md.total };
  }), [months, monthlyData]);

  const byNatureza = useMemo(() => {
    const map = {};
    filtered.forEach(d => {
      const k = getNaturezaShort(d.natureza);
      map[k] = (map[k] || 0) + d.valor;
    });
    return Object.entries(map).sort((a,b) => b[1]-a[1]).map(([name,value]) => ({name,value}));
  }, [filtered]);

  const byCategoria = useMemo(() => {
    const map = { equipe: 0, marketing: 0, administrativa: 0, operacional: 0 };
    filtered.forEach(d => { map[categorize(d)] += d.valor; });
    return Object.entries(map).map(([name,value]) => ({name: name.charAt(0).toUpperCase()+name.slice(1), value}));
  }, [filtered]);

  const equipeDetail = useMemo(() => {
    const map = {};
    filtered.forEach(d => {
      const m = getEquipeMember(d);
      if (m) { map[m] = (map[m]||0) + d.valor; }
    });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([name,value])=>({name,value}));
  }, [filtered]);

  const limitsData = useMemo(() => {
    const map = {};
    data.forEach(d => {
      const m = getMonth(d.comp);
      if (!m) return;
      if (!map[m]) map[m] = { combustivel: 0, seguranca: 0, locacao: 0 };
      if (d.natureza.includes("COMBUSTÍVEIS")) map[m].combustivel += d.valor;
      if (d.natureza.includes("SEGURANÇA")) map[m].seguranca += d.valor;
      if (d.natureza.includes("LOCAÇÃO OU FRETE")) map[m].locacao += d.valor;
    });
    return months.map(m => ({
      mes: MONTHS_LABEL[m]||m,
      combustivel: map[m]?.combustivel||0, limComb: LIM_COMBUSTIVEL,
      seguranca: map[m]?.seguranca||0, limSeg: LIM_SEGURANCA,
      locacao: map[m]?.locacao||0, limLoc: LIM_LOCACAO
    }));
  }, [months, data]);

  const reimbStatus = useMemo(() => {
    let ressarcidas=0, pendentes=0, naoEnviadas=0, pendValor=0, naoEnvValor=0, ressValor=0;
    filtered.forEach(d => {
      if (d.bsb && d.ressarcido) { ressarcidas++; ressValor += d.ressarcido; }
      else if (d.bsb && !d.ressarcido) { pendentes++; pendValor += d.valor; }
      else { naoEnviadas++; naoEnvValor += d.valor; }
    });
    return { ressarcidas, pendentes, naoEnviadas, pendValor, naoEnvValor, ressValor };
  }, [filtered]);

  const pendList = useMemo(() => filtered.filter(d => d.bsb && !d.ressarcido), [filtered]);
  const naoEnvList = useMemo(() => filtered.filter(d => !d.bsb), [filtered]);

  const totalGeral = useMemo(() => data.reduce((s,d) => s+d.valor, 0), [data]);
  const totalRessarcido = useMemo(() => data.reduce((s,d) => s+(d.ressarcido||0), 0), [data]);
  const totalFixas = useMemo(() => data.filter(d=>d.fixa==="SIM").reduce((s,d)=>s+d.valor,0), [data]);
  const totalVariaveis = totalGeral - totalFixas;
  const mediamensal = totalGeral / months.length;

  const fixasList = useMemo(() => {
    const map = {};
    data.filter(d=>d.fixa==="SIM").forEach(d => {
      const key = d.desc.split("(")[0].trim().split(" - ")[0].trim();
      if (!map[key]) map[key] = { desc: key, total: 0, count: 0, natureza: getNaturezaShort(d.natureza) };
      map[key].total += d.valor; map[key].count++;
    });
    return Object.values(map).sort((a,b)=>b.total-a.total);
  }, [data]);

  const equipeItems = useMemo(() => filtered.filter(d => categorize(d) === "equipe"), [filtered]);
  const marketingItems = useMemo(() => filtered.filter(d => categorize(d) === "marketing"), [filtered]);
  const adminItems = useMemo(() => filtered.filter(d => categorize(d) === "administrativa"), [filtered]);
  const operItems = useMemo(() => filtered.filter(d => categorize(d) === "operacional"), [filtered]);

  const tabs = [
    {id:"resumo",label:"Resumo Geral"},
    {id:"mensal",label:"Análise Mensal"},
    {id:"natureza",label:"Naturezas"},
    {id:"categoria",label:"Categorias"},
    {id:"limites",label:"Limites CEAP"},
    {id:"ressarcimento",label:"Ressarcimento"},
    {id:"listas",label:"Listas Detalhadas"}
  ];

  const S = {
    bg: "#0f172a", card: "#1e293b", cardAlt: "#162032", border: "#334155", accent: "#0ea5e9",
    green: "#10b981", red: "#ef4444", yellow: "#f59e0b", purple: "#8b5cf6",
    text: "#e2e8f0", textMuted: "#94a3b8", textDim: "#64748b"
  };

  const cardStyle = { background: S.card, borderRadius: 12, padding: "18px 22px", border: `1px solid ${S.border}` };
  const labelStyle = { fontSize: 11, color: S.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 };
  const bigNum = { fontSize: 22, fontWeight: 800, color: S.text, lineHeight: 1.2 };

  const KPI = ({label,value,color,sub}) => (
    <div style={cardStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={{...bigNum, color: color||S.text}}>{value}</div>
      {sub && <div style={{fontSize:11,color:S.textDim,marginTop:4}}>{sub}</div>}
    </div>
  );

  const ItemRow = ({item, showCat}) => (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",borderBottom:`1px solid ${S.border}`,fontSize:12,gap:8}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:S.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.desc}</div>
        <div style={{color:S.textDim,fontSize:10}}>{getNaturezaShort(item.natureza)}{showCat&&` · ${categorize(item)}`} · {MONTHS_LABEL[getMonth(item.comp)]||getMonth(item.comp)}</div>
      </div>
      <div style={{fontWeight:700,color:S.text,whiteSpace:"nowrap"}}>{fmt(item.valor)}</div>
      <div style={{width:56,textAlign:"center"}}>
        {item.ressarcido ? <span style={{color:S.green,fontSize:10,fontWeight:600}}>RESS.</span>
        : item.bsb ? <span style={{color:S.yellow,fontSize:10,fontWeight:600}}>PEND.</span>
        : <span style={{color:S.red,fontSize:10,fontWeight:600}}>N/ENV.</span>}
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:S.bg,color:S.text,minHeight:"100vh",padding:0}}>
      <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)",borderBottom:`1px solid ${S.border}`,padding:"24px 28px 16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
          <div style={{width:8,height:32,borderRadius:4,background:"linear-gradient(180deg,#0ea5e9,#8b5cf6)"}}/>
          <div>
            <h1 style={{margin:0,fontSize:22,fontWeight:800,letterSpacing:"-0.5px"}}>Dashboard CEAP</h1>
            <p style={{margin:0,fontSize:12,color:S.textMuted}}>Controle de Despesas da Cota Parlamentar · Dep. Zé Adriano</p>
          </div>
        </div>
        <div style={{display:"flex",gap:6,marginTop:14,flexWrap:"wrap"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              padding:"6px 14px",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",border:"none",
              background:tab===t.id?"#0ea5e9":"transparent",color:tab===t.id?"#fff":S.textMuted,
              transition:"all .2s"
            }}>{t.label}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:8,marginTop:10,alignItems:"center"}}>
          <span style={{fontSize:11,color:S.textDim}}>Filtro:</span>
          <select value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)} style={{
            background:S.card,border:`1px solid ${S.border}`,borderRadius:6,color:S.text,padding:"4px 10px",fontSize:11
          }}>
            <option value="all">Todos os meses</option>
            {months.map(m=><option key={m} value={m}>{MONTHS_LABEL[m]||m}</option>)}
          </select>
        </div>
      </div>

      <div style={{padding:"20px 28px",maxWidth:1200,margin:"0 auto"}}>
        {tab==="resumo"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:20}}>
              <KPI label="Total Despesas" value={fmt(totalGeral)} sub={`${data.length} itens em ${months.length} meses`}/>
              <KPI label="Total Ressarcido" value={fmt(totalRessarcido)} color={S.green} sub={pct(totalRessarcido/totalGeral)+" do total"}/>
              <KPI label="Média Mensal" value={fmt(mediamensal)} color={S.accent}/>
              <KPI label="Cota Mensal (até Fev)" value={fmt(CEAP_ATE_FEV)} color={S.purple} sub={`Mar+: ${fmt(CEAP_MARCO)}+${fmt(PLUS_VEICULOS)}`}/>
              <KPI label="Despesas Fixas" value={fmt(totalFixas)} color={S.yellow} sub={pct(totalFixas/totalGeral)+" do total"}/>
              <KPI label="Despesas Variáveis" value={fmt(totalVariaveis)} sub={pct(totalVariaveis/totalGeral)+" do total"}/>
            </div>

            <div style={{...cardStyle,marginBottom:20}}>
              <div style={{...labelStyle,marginBottom:12}}>Despesas vs Cota Mensal</div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartMonthly} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke={S.border}/>
                  <XAxis dataKey="mes" tick={{fill:S.textMuted,fontSize:11}}/>
                  <YAxis tick={{fill:S.textMuted,fontSize:10}} tickFormatter={v=>`${(v/1000).toFixed(0)}k`}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Legend wrapperStyle={{fontSize:11}}/>
                  <Bar dataKey="total" name="Despesa Total" fill="#ef4444" radius={[4,4,0,0]}/>
                  <Bar dataKey="ressarcido" name="Ressarcido" fill="#10b981" radius={[4,4,0,0]}/>
                  <Bar dataKey="cota" name="Cota CEAP" fill="#334155" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div style={cardStyle}>
                <div style={{...labelStyle,marginBottom:12}}>Por Natureza de Despesa</div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={byNatureza} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={45} paddingAngle={2}>
                      {byNatureza.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                    </Pie>
                    <Tooltip formatter={v=>fmt(v)}/>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:4}}>
                  {byNatureza.slice(0,6).map((e,i)=>(
                    <span key={i} style={{fontSize:9,color:COLORS[i%COLORS.length],background:`${COLORS[i%COLORS.length]}15`,padding:"2px 6px",borderRadius:4}}>
                      {e.name}: {fmt(e.value)}
                    </span>
                  ))}
                </div>
              </div>
              <div style={cardStyle}>
                <div style={{...labelStyle,marginBottom:12}}>Por Categoria</div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={byCategoria} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={45} paddingAngle={3}>
                      <Cell fill="#8b5cf6"/><Cell fill="#e11d48"/><Cell fill="#0ea5e9"/><Cell fill="#f59e0b"/>
                    </Pie>
                    <Tooltip formatter={v=>fmt(v)}/>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:4,flexWrap:"wrap"}}>
                  {byCategoria.map((c,i)=>(
                    <span key={i} style={{fontSize:11,fontWeight:600,color:["#8b5cf6","#e11d48","#0ea5e9","#f59e0b"][i]}}>
                      {c.name}: {fmt(c.value)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==="mensal"&&(
          <div>
            <div style={{...cardStyle,marginBottom:16}}>
              <div style={{...labelStyle,marginBottom:12}}>Evolução Mensal — Despesa vs Ressarcimento</div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartMonthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke={S.border}/>
                  <XAxis dataKey="mes" tick={{fill:S.textMuted,fontSize:11}}/>
                  <YAxis tick={{fill:S.textMuted,fontSize:10}} tickFormatter={v=>`${(v/1000).toFixed(0)}k`}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Legend wrapperStyle={{fontSize:11}}/>
                  <Line type="monotone" dataKey="total" name="Despesa" stroke="#ef4444" strokeWidth={2.5} dot={{r:4}}/>
                  <Line type="monotone" dataKey="ressarcido" name="Ressarcido" stroke="#10b981" strokeWidth={2.5} dot={{r:4}}/>
                  <Line type="monotone" dataKey="cota" name="Cota CEAP" stroke="#64748b" strokeWidth={1.5} strokeDasharray="8 4"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
              {months.map(m => {
                const md = monthlyData[m];
                if (!md) return null;
                const ceap = m >= "2026-03" ? CEAP_MARCO+PLUS_VEICULOS : CEAP_ATE_FEV;
                const overBudget = md.total > ceap;
                return (
                  <div key={m} style={{...cardStyle, borderLeft:`3px solid ${overBudget?S.red:S.green}`}}>
                    <div style={{fontWeight:700,fontSize:14,marginBottom:8}}>{MONTHS_LABEL[m]}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,fontSize:11}}>
                      <span style={{color:S.textMuted}}>Total:</span><span style={{fontWeight:700,textAlign:"right"}}>{fmt(md.total)}</span>
                      <span style={{color:S.textMuted}}>Cota:</span><span style={{textAlign:"right"}}>{fmt(ceap)}</span>
                      <span style={{color:S.textMuted}}>Saldo:</span><span style={{fontWeight:700,textAlign:"right",color:overBudget?S.red:S.green}}>{fmt(ceap-md.total)}</span>
                      <span style={{color:S.textMuted}}>Ressarcido:</span><span style={{textAlign:"right",color:S.green}}>{fmt(md.ressarcido)}</span>
                      <span style={{color:S.textMuted}}>Utilização:</span><span style={{textAlign:"right",color:md.total/ceap>0.95?S.red:md.total/ceap>0.8?S.yellow:S.green,fontWeight:700}}>{pct(md.total/ceap)}</span>
                      <span style={{color:S.textMuted}}>Fixas:</span><span style={{textAlign:"right"}}>{fmt(md.fixas)}</span>
                      <span style={{color:S.textMuted}}>Variáveis:</span><span style={{textAlign:"right"}}>{fmt(md.variaveis)}</span>
                      <span style={{color:S.textMuted}}>Itens:</span><span style={{textAlign:"right"}}>{md.items.length}</span>
                    </div>
                    <div style={{marginTop:8,display:"flex",gap:4}}>
                      <span style={{fontSize:9,background:`${S.green}20`,color:S.green,padding:"2px 6px",borderRadius:4}}>{md.enviadas} ress.</span>
                      <span style={{fontSize:9,background:`${S.yellow}20`,color:S.yellow,padding:"2px 6px",borderRadius:4}}>{md.pendRessarc} pend.</span>
                      <span style={{fontSize:9,background:`${S.red}20`,color:S.red,padding:"2px 6px",borderRadius:4}}>{md.naoEnviadas} n/env.</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="natureza"&&(
          <div>
            <div style={{...cardStyle,marginBottom:16}}>
              <div style={{...labelStyle,marginBottom:12}}>Distribuição por Natureza de Despesa</div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={byNatureza} layout="vertical" margin={{left:80}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={S.border}/>
                  <XAxis type="number" tick={{fill:S.textMuted,fontSize:10}} tickFormatter={v=>`${(v/1000).toFixed(0)}k`}/>
                  <YAxis type="category" dataKey="name" tick={{fill:S.textMuted,fontSize:10}} width={80}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="value" name="Valor" radius={[0,6,6,0]}>
                    {byNatureza.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{...cardStyle}}>
              <div style={{...labelStyle,marginBottom:8}}>Detalhamento</div>
              {byNatureza.map((n,i) => (
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${S.border}`,fontSize:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:10,height:10,borderRadius:2,background:COLORS[i%COLORS.length]}}/>
                    <span>{n.name}</span>
                  </div>
                  <div style={{display:"flex",gap:20}}>
                    <span style={{fontWeight:700}}>{fmt(n.value)}</span>
                    <span style={{color:S.textDim,width:50,textAlign:"right"}}>{pct(n.value/filtered.reduce((s,d)=>s+d.valor,0))}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="categoria"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14,marginBottom:16}}>
              <KPI label="Equipe" value={fmt(byCategoria.find(c=>c.name==="Equipe")?.value||0)} color={S.purple} sub={`${equipeItems.length} itens`}/>
              <KPI label="Marketing" value={fmt(byCategoria.find(c=>c.name==="Marketing")?.value||0)} color="#e11d48" sub={`${marketingItems.length} itens`}/>
              <KPI label="Administrativas" value={fmt(byCategoria.find(c=>c.name==="Administrativa")?.value||0)} color={S.accent} sub={`${adminItems.length} itens`}/>
              <KPI label="Operacionais" value={fmt(byCategoria.find(c=>c.name==="Operacional")?.value||0)} color={S.yellow} sub={`${operItems.length} itens`}/>
            </div>
            {equipeDetail.length>0&&(
              <div style={{...cardStyle,marginBottom:14}}>
                <div style={{...labelStyle,marginBottom:8,color:S.purple}}>Despesas com Equipe (Serviços Prestados)</div>
                {equipeDetail.map((e,i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${S.border}`,fontSize:12}}>
                    <span style={{fontWeight:600}}>{e.name}</span><span style={{fontWeight:700}}>{fmt(e.value)}</span>
                  </div>
                ))}
                <div style={{marginTop:10,maxHeight:300,overflowY:"auto"}}>
                  {equipeItems.map((d,i) => <ItemRow key={i} item={d}/>)}
                </div>
              </div>
            )}
            <div style={{...cardStyle,marginBottom:14}}>
              <div style={{...labelStyle,marginBottom:8,color:"#e11d48"}}>Despesas de Marketing (Divulgação, Banners, Gráfica, Livretos)</div>
              <div style={{maxHeight:350,overflowY:"auto"}}>
                {marketingItems.sort((a,b)=>b.valor-a.valor).map((d,i) => <ItemRow key={i} item={d}/>)}
              </div>
            </div>
            <div style={{...cardStyle,marginBottom:14}}>
              <div style={{...labelStyle,marginBottom:8,color:S.accent}}>Despesas Administrativas (Imóvel, Utilidades, Software, IPTU)</div>
              <div style={{maxHeight:300,overflowY:"auto"}}>
                {adminItems.sort((a,b)=>b.valor-a.valor).map((d,i) => <ItemRow key={i} item={d}/>)}
              </div>
            </div>
            <div style={{...cardStyle}}>
              <div style={{...labelStyle,marginBottom:8,color:S.yellow}}>Despesas Operacionais (Combustível, Veículos, Segurança, Hospedagem)</div>
              <div style={{maxHeight:300,overflowY:"auto"}}>
                {operItems.sort((a,b)=>b.valor-a.valor).map((d,i) => <ItemRow key={i} item={d}/>)}
              </div>
            </div>
          </div>
        )}

        {tab==="limites"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:16}}>
              <KPI label="Limite Combustível" value={fmt(LIM_COMBUSTIVEL)} color={S.yellow} sub="Mensal"/>
              <KPI label="Limite Segurança" value={fmt(LIM_SEGURANCA)} color={S.accent} sub="Mensal"/>
              <KPI label="Limite Loc. Veículos" value={fmt(LIM_LOCACAO)} color={S.purple} sub="Mensal"/>
            </div>
            {[{key:"combustivel",label:"Combustível",lim:LIM_COMBUSTIVEL,limKey:"limComb",color:"#f59e0b"},
              {key:"seguranca",label:"Segurança",lim:LIM_SEGURANCA,limKey:"limSeg",color:"#0ea5e9"},
              {key:"locacao",label:"Locação de Veículos",lim:LIM_LOCACAO,limKey:"limLoc",color:"#8b5cf6"}].map(cfg=>(
              <div key={cfg.key} style={{...cardStyle,marginBottom:14}}>
                <div style={{...labelStyle,marginBottom:12,color:cfg.color}}>{cfg.label} — Gasto vs Limite ({fmt(cfg.lim)})</div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={limitsData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke={S.border}/>
                    <XAxis dataKey="mes" tick={{fill:S.textMuted,fontSize:11}}/>
                    <YAxis tick={{fill:S.textMuted,fontSize:10}} tickFormatter={v=>`${(v/1000).toFixed(0)}k`}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <ReferenceLine y={cfg.lim} stroke="#ef4444" strokeDasharray="6 3" label={{value:"Limite",fill:"#ef4444",fontSize:10}}/>
                    <Bar dataKey={cfg.key} name={cfg.label} fill={cfg.color} radius={[4,4,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{marginTop:6}}>
                  {limitsData.map((d,i)=>{
                    const v = d[cfg.key]; const over = v > cfg.lim;
                    return v > 0 ? (
                      <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"3px 0",borderBottom:`1px solid ${S.border}`}}>
                        <span>{d.mes}</span>
                        <span style={{fontWeight:700,color:over?S.red:S.green}}>{fmt(v)} {over?`(+${fmt(v-cfg.lim)} acima)`:`(${fmt(cfg.lim-v)} restante)`}</span>
                      </div>
                    ):null;
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==="ressarcimento"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:16}}>
              <KPI label="Ressarcidas" value={`${reimbStatus.ressarcidas} itens`} color={S.green} sub={fmt(reimbStatus.ressValor)}/>
              <KPI label="Enviadas (Pendentes)" value={`${reimbStatus.pendentes} itens`} color={S.yellow} sub={fmt(reimbStatus.pendValor)}/>
              <KPI label="Não Enviadas" value={`${reimbStatus.naoEnviadas} itens`} color={S.red} sub={fmt(reimbStatus.naoEnvValor)}/>
            </div>
            <div style={{...cardStyle,marginBottom:14}}>
              <div style={{...labelStyle,marginBottom:8,color:S.yellow}}>Enviadas p/ BSB mas NÃO Ressarcidas ({pendList.length} itens — {fmt(pendList.reduce((s,d)=>s+d.valor,0))})</div>
              <div style={{maxHeight:400,overflowY:"auto"}}>
                {pendList.length === 0 ? <div style={{color:S.textDim,fontSize:12,padding:8}}>Nenhuma no filtro selecionado</div> :
                  pendList.map((d,i)=><ItemRow key={i} item={d} showCat/>)}
              </div>
            </div>
            <div style={{...cardStyle}}>
              <div style={{...labelStyle,marginBottom:8,color:S.red}}>NÃO Enviadas para BSB ({naoEnvList.length} itens — {fmt(naoEnvList.reduce((s,d)=>s+d.valor,0))})</div>
              <div style={{maxHeight:400,overflowY:"auto"}}>
                {naoEnvList.length === 0 ? <div style={{color:S.textDim,fontSize:12,padding:8}}>Nenhuma no filtro selecionado</div> :
                  naoEnvList.map((d,i)=><ItemRow key={i} item={d} showCat/>)}
              </div>
            </div>
          </div>
        )}

        {tab==="listas"&&(
          <div>
            <div style={{...cardStyle,marginBottom:14}}>
              <div style={{...labelStyle,marginBottom:8}}>Despesas Fixas Recorrentes — Média Mensal</div>
              {fixasList.slice(0,20).map((f,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:`1px solid ${S.border}`,fontSize:12}}>
                  <div>
                    <div style={{fontWeight:600,color:S.text}}>{f.desc}</div>
                    <div style={{fontSize:10,color:S.textDim}}>{f.natureza} · {f.count} ocorrências</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontWeight:700}}>{fmt(f.total)}</div>
                    <div style={{fontSize:10,color:S.textMuted}}>~{fmt(f.total/f.count)}/mês</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{...cardStyle}}>
              <div style={{...labelStyle,marginBottom:8}}>Todas as Despesas ({filtered.length} itens — {fmt(filtered.reduce((s,d)=>s+d.valor,0))})</div>
              <div style={{maxHeight:500,overflowY:"auto"}}>
                {filtered.sort((a,b)=>b.valor-a.valor).map((d,i)=><ItemRow key={i} item={d} showCat/>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
