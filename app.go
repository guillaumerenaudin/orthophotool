package orthophotool

import (
	"net/http"
	"html/template"
	"log"
)



func init() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/dyslexia", handlerDyslexia)
}

func handler(w http.ResponseWriter, r *http.Request){
	log.Print("Start handling request on /")

	var mainTmpl = template.Must(template.ParseFiles("templates/welcome.tmpl","templates/page.tmpl"))

	tc := make(map[string]interface{})
	
	
	if err := mainTmpl.ExecuteTemplate(w, "page", tc); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Fatal(err)
	}

}