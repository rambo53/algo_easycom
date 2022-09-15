import pandas as pd
from bs4 import BeautifulSoup
import re

df = pd.read_excel("MECANIQUE VF02.xlsx")


str_to_replace = '<td  af_src=" af_idAsset=" af_filename=" >'
good_str = '<td  af_src="" af_idAsset="" af_filename="" >'

df["URL SLUG produit VDM"] = df["URL SLUG produit VDM"].astype(str)
df["tableau croisé"] = df["tableau croisé"].astype(str)

url_prefix = "https://www.vdm-reya.com/"

df_groups = df.groupby(["Désignation produit"])

for key, df_group in df_groups:   

    lien = df_groups.get_group(key)["URL SLUG produit VDM"].head(1).values[0]

    table = df_groups.get_group(key)["tableau croisé"].head(1).values[0]
    
    if table != "nan":
        
        table_str = table.replace(str_to_replace, good_str)
        
        html = BeautifulSoup(table_str)

        htmls = html.find_all(re.compile("(h-header|b-body)"))

        for html_elt in htmls:
            new_a = html.new_tag("a")
            new_a.string = html_elt.text
            new_a.attrs['href']= url_prefix+lien 
            html_elt.string = ""
            html_elt.append(new_a)

        first = df_group.first_valid_index()
        last = df_group.last_valid_index()
        final_table = str(html.find('table').extract())

        df.loc[first:last,"tableau croisé"] = final_table
    

df.to_excel("MECANIQUE VF02_URL.xlsx", index=False)
