import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  increment,
  query,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore'
import { db } from '../firebase'
import { TOPICS } from '../data/topics'

const POINTS_PER_CORRECT_ANSWER = 10
const POINTS_PER_TOPIC_COMPLETE = 50

// One read of up to `n` docs, sorted by points. Firestore charges per
// document read, so keep `n` small (the leaderboard UI only needs the
// top page) — this is what keeps you inside the free daily quota.
export async function fetchLeaderboard(n = 20) {
  const q = query(collection(db, 'users'), orderBy('points', 'desc'), limit(n))
  const snap = await getDocs(q)
  return snap.docs.map((d, i) => ({ id: d.id, rank: i + 1, ...d.data() }))
}

// Records a completed quiz attempt: awards points per correct answer,
// a completion bonus on first-time completion of a topic, and marks
// lessons complete. Writes a single merged update (one Firestore write)
// rather than one write per field.
export async function submitQuizResult({ uid, topicId, correctCount, totalQuestions, alreadyCompleted }) {
  const ref = doc(db, 'users', uid)
  const earnedPoints = correctCount * POINTS_PER_CORRECT_ANSWER + (alreadyCompleted ? 0 : POINTS_PER_TOPIC_COMPLETE)

  const updates = {
    points: increment(earnedPoints),
    quizzesCompleted: increment(1),
    [`topicsCompleted.${topicId}`]: true,
  }
  await updateDoc(ref, updates)
  return earnedPoints
}

export async function markLessonComplete({ uid, lessonId }) {
  const ref = doc(db, 'users', uid)
  await updateDoc(ref, { [`lessonsCompleted.${lessonId}`]: true })
}

export function computeOverallProgress(profile) {
  const totalTopics = TOPICS.length
  const completedTopics = Object.keys(profile?.topicsCompleted || {}).length
  const totalLessons = TOPICS.reduce((sum, t) => sum + t.lessons.length, 0)
  const completedLessons = Object.keys(profile?.lessonsCompleted || {}).length
  const percent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100)
  return { totalTopics, completedTopics, totalLessons, completedLessons, percent }
}

export function computeTopicProgress(profile, topic) {
  const done = topic.lessons.filter((l) => profile?.lessonsCompleted?.[l.id]).length
  return Math.round((done / topic.lessons.length) * 100)
}

// --- Community posts -------------------------------------------------

export async function fetchCommunityPosts(n = 30) {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(n))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function createCommunityPost({ uid, authorName, body, type = 'question' }) {
  await addDoc(collection(db, 'posts'), {
    uid,
    authorName,
    body,
    type,
    likeUids: [],
    replyCount: 0,
    createdAt: serverTimestamp(),
  })
}

export async function likePost(postId, uid) {
  const ref = doc(db, 'posts', postId)
  await updateDoc(ref, { likeUids: arrayUnion(uid) })
}
