import type { SpeakerTurn, TrackMaterial, KeyPhrase, AudioTrack } from '../types/curriculum';

/**
 * リスニング・音読トラックの共通型（ListeningAudioPlayer / ListeningEvidenceScript /ListeningMaterials 用）。
 * AudioTrack と互換の形を葉モジュールとして公開する。
 */
export type ListeningMaterial = TrackMaterial;
export type ListeningSpeakerTurn = SpeakerTurn;
export type ListeningKeyPhrase = KeyPhrase;
export type ListeningAudioTrack = AudioTrack;
