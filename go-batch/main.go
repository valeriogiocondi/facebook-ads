package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"gopkg.in/robfig/cron.v2"
)

/* 
 * https://godoc.org/github.com/robfig/cron
 *
 */

var port = ":3006"
var timeFetchTaskList = "00:00"
var serverURL = "http://localhost:8081/"
var goBatchURL = serverURL + "api/batch-scheduler/"
var fbApiURL = serverURL + "api/facebook-api/"

type PageSocial struct {	
	Id 					int
	InternalId 	string
	Name 				string
	__v 				int
}

type TaskStruct struct {	
	Id 										int
	PageId 								string
	PageSocial 						PageSocial
	AdActiveStatus 				string
	AdReachedCountries 		string
	AdType 								string
	ImpressionCondition 	string
	SearchTerms 					string
	Time 									string
	Created 							string
	__v 									int
}

// id
// pageSocial {
// 		id
// 		internalId
// 		name
// 		publisherPlatform {
// 				idPublisherPlatform
// 				valuePublisherPlatform
// 		}
// }
// adActiveStatus
// adReachedCountries
// adType
// impressionCondition
// searchTerms
// time
// created

var taskList = make([]TaskStruct, 0)


func main() {

	c := cron.New()
	
	// Exec immmediately
	fmt.Println("go-batch has started!")
	execPipeline(c, &taskList) 
	
	// Exec every day at 00:00
	c.AddFunc("TZ=Europe/Rome 00 00 * * *", func() { 
		execPipeline(c, &taskList) 
	})

	c.Start()
	startserver()
}


func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "PONG", r.URL.Path[1:])
}

func startserver() {

	fmt.Println("Server is starting...")

	http.HandleFunc("/", handler)
	err := http.ListenAndServe(port, nil)
	
	if (err != nil) {
		log.Fatal("The server has started with error %s\n", err)
	}
}

func restCall(url string) []byte {

	response, err := http.Get(url)

	if (err != nil) {
		log.Fatal("The HTTP request failed with error: %s\n", err)
	} 

	resultByte, _ := ioutil.ReadAll(response.Body)
	return resultByte
}

/* 
 *	 GET TASK LIST
 *
 */
func GetTaskList(taskList *[]TaskStruct) {

	var res []byte;

	fmt.Println("Getting task list...")
	res = restCall(goBatchURL)
	err := json.Unmarshal(res, taskList)

	for _, task := range *taskList {
		
		fmt.Println("- ", task.Id)
		fmt.Println("- " + task.PageSocial.InternalId)
		fmt.Println("- " + task.PageSocial.Name)
		fmt.Print("- " + task.AdActiveStatus)
		fmt.Print(", " + task.AdReachedCountries)
		fmt.Print(", " + task.AdType)
		fmt.Print(", " + task.ImpressionCondition)
		fmt.Print(", " + task.SearchTerms)
		fmt.Println()
		fmt.Println("- " + task.Time)
		fmt.Println()
		fmt.Println()
	}

	if (err != nil) {
		log.Fatal("json.Unmarshal failed with error %s\n", err)
	}
}

/* 
 *	 FACEBOOK API
 *
 */
func callFacebookAPI(params TaskStruct) {

	fmt.Println("Starting callFacebookAPI...")

	var url string = fbApiURL;

	url += "?";
	url += "search_page_ids=" 	 		+ params.PageSocial.InternalId + "&";
	url += "ad_active_status=" 	 		+ params.AdActiveStatus + "&";
	url += "ad_reached_countries="	+ params.AdReachedCountries + "&";
	url += "ad_type=" 	 						+ params.AdType + "&";
	url += "impression_condition="	+ params.ImpressionCondition + "&";
	url += "search_terms=" 	 				+ params.SearchTerms + "&";
	url = url[:len(url)-1]

	fmt.Println(url);

	restCall(url)
}

func execPipeline(c *cron.Cron, taskList *[]TaskStruct) {

	GetTaskList(taskList) 
	
	fmt.Println("Adding task to pipeline...")
	for _, task := range *taskList {

		addTask(c, task)
	}
}

func addTask(c *cron.Cron, task TaskStruct) {

	timeTask := task.Time[3:] +" "+ task.Time[:2];

	// fmt.Println(task.Time)
	fmt.Println("Adding task at TZ=Europe/Rome " + timeTask +" * * *")

	c.AddFunc("TZ=Europe/Rome " + timeTask +" * * *", func() { 

		go callFacebookAPI(task)
	})
}