import {createStore} from 'redux'
import {questionChangeTitle,questionChangeDescribe,questionChangeImg,questionId,stuId,reportId,feedbackId,logId,subjectId,subjectName,college,subjectInfo,subjectNote,subjectIcon} from './reducers'
export const qID = createStore(questionId);
export const qTitleStore = createStore(questionChangeTitle);
export const qDescribeStore = createStore(questionChangeDescribe);
export const qImgStore = createStore(questionChangeImg);
export const stuIdStore = createStore(stuId);
export const reportIdStore = createStore(reportId);
export const feedbackIdStore = createStore(feedbackId);
export const logIdStore = createStore(logId);
export const subjectIdStore = createStore(subjectId);
export const subjectNameStore = createStore(subjectName) 
export const collegeStore = createStore(college)
export const subjectInfoStore = createStore(subjectInfo)
export const subjectNoteStore = createStore(subjectNote)
export const subjectIconStore = createStore(subjectIcon)
