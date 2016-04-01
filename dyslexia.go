package orthophotool

import (
	"net/http"
	"html/template"
	"log"
)

func handlerDyslexia(w http.ResponseWriter, r *http.Request){
	log.Print("Start handling request on /dyslexia")

	var subTmpl = template.Must(template.ParseFiles("templates/dyslexia.tmpl","templates/page.tmpl"))
	
	tc := make(map[string]interface{})
	
	if err := subTmpl.ExecuteTemplate(w, "page", tc); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Fatal(err)
	}

}