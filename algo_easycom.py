if __name__ == '__main__':

    def clean_json(fjson):

        if isinstance(fjson, list):
            new_json = [f for f in fjson if not isinstance(f, dict)]
            if len(new_json) == 0:
                new_json = [f for f in fjson if isinstance(f, dict)]
                lst =[]
                for j in new_json:
                    lst.append(clean_json(j))  
                return lst
            return new_json         
    
        new_json = {}

        for k, v in fjson.items():

            if k != "_links":
                if isinstance(v, dict):
                    new_json[k] = clean_json(v)
                elif isinstance(v, list):
                    if len(v) == 0:
                        new_json[k] = None
                    else:
                        new_json[k] = clean_json(v)
                else :
                    new_json[k] = v

        return new_json



    json = {
        'value1': 'blabla',
        '_links': 'hoho',
        "value2": {"value2.1":"test", "value2.2":"test2", "value2.3":"test3", "_links":'1223'},
        "value3": ["test", "test2", "test3"],
        "value4": [{'tata':'toto', 'toto':'tata'},{"_links":"href", 'popo':'papa'}],
        "value5": {"value2.1":"test",
                 "value2.2":"test2", 
                 "value2.3":"test3", 
                 "_links":'1223', 
                 'liste':['1','2','3'], 
                 "liste2":[] ,
                 'dictrec':{'go':"allez", 'poo':'caca', '_links':"ref"}}
    }

    print(clean_json(json))
