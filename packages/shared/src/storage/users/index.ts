import { User as FirebaseUser } from 'firebase/auth'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  CollectionReference,
  DocumentData,
  updateDoc,
  Timestamp
} from 'firebase/firestore/lite'

import { Timestamps, firestore } from '../firestore'

type CustomUserConfigs = {
  // Add custom configurations here
  autoSharing: boolean
}
type BaseUserConfigs = {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  created: Timestamp
} & Timestamps

export type User = BaseUserConfigs & CustomUserConfigs

export class UserStore {
  private _db: CollectionReference<DocumentData>

  constructor() {
    this._db = collection(firestore, 'users')
  }

  public async exists(uid: string) {
    const document = await getDoc(doc(this._db, uid))

    return document.exists()
  }

  public async get(uid: string): Promise<User> {
    const document = await getDoc(doc(this._db, uid))

    return document.data() as User
  }

  public async create(user: FirebaseUser): Promise<User> {
    const createdUser: User = {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      autoSharing: false,
      created: Timestamp.fromDate(new Date()),
      updated: Timestamp.fromDate(new Date())
    }

    await setDoc(doc(this._db, user.uid), createdUser)

    return createdUser
  }

  public async update(uid: string, user: CustomUserConfigs) {
    return updateDoc(doc(this._db, uid), {
      autoSharing: user.autoSharing,
      updated: Timestamp.fromDate(new Date())
    })
  }
}
