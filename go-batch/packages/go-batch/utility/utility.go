package batch_facebook

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log"
	"net/http"
    "time"
)

var port = ":3003"
var timeFetchTaskList = "00:00"
var goBatchURL = "http://3.133.101.140:3002/api/batch-scheduler/"
var fbApiURL = "http://3.133.101.140:3002/api/facebook-api/"

type TaskStruct struct {
	Id string
	PageId string
	AdActiveStatus string
	AdReachedCountries string
	AdType string
	ImpressionCondition string
	SearchTerms string
	Time string
	Created string
	__v int
}

// func handler(w http.ResponseWriter, r *http.Request) {
//     fmt.Fprintf(w, "PONG", r.URL.Path[1:])
// }

func StartServer() {

	// http.HandleFunc("/", handler)
	err := http.ListenAndServe(port, nil)
	
	if (err != nil) {
		log.Fatal("The server has started with error %s\n", err)
	}
}

func restCall(url string, ) []byte {

	response, err := http.Get(url)
	
	if (err != nil) {
		log.Fatal("The HTTP request failed with error %s\n", err)	
	} 

	resultByte, _ := ioutil.ReadAll(response.Body)
	return resultByte
}

func GetTaskList(taskList *[]TaskStruct) {

	var res []byte;

	res = restCall(goBatchURL)
	err := json.Unmarshal(res, taskList)

	if (err != nil) {
		log.Fatal("json.Unmarshal failed with error %s\n", err)
	}

	execPipeline(taskList);
}

func getTimeNow() string {

    hours, minutes, _ := time.Now().Clock();

	return fmt.Sprintf("%02d:%02d", hours, minutes);
}

func CheckPipeline(taskList *[]TaskStruct) {

	if (getTimeNow() == timeFetchTaskList) {

		GetTaskList(taskList)
	}
	
	execPipeline(taskList)
}

func callFacebookAPI(params TaskStruct) {

	var url string = fbApiURL;

	url += "?";
	url += "search_page_ids=" + params.PageId + "&";
	url += "ad_active_status=" + params.AdActiveStatus + "&";
	url += "ad_reached_countries=" + params.AdReachedCountries + "&";
	url += "ad_type=" + params.AdType + "&";
	url += "impression_condition=" + params.ImpressionCondition + "&";
	url += "search_terms=" + params.SearchTerms + "&";
	url = url[:len(url)-1]

	fmt.Println(url);

	restCall(url)
}

func execPipeline(taskList *[]TaskStruct) {

	timeNow := getTimeNow()

	for _, task := range *taskList {

		if (timeNow == task.Time) {
			
			go callFacebookAPI(task)
		}
	}
}