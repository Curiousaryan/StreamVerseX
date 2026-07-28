package com.streamversex.backend.mapper;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.streamversex.backend.dto.response.AnimeCharacterResponseDTO;
import com.streamversex.backend.dto.response.AnimeDetailsResponseDTO;
import com.streamversex.backend.dto.response.AnimeResponseDTO;
import com.streamversex.backend.dto.response.AnimeTrailerResponseDTO;
import com.streamversex.backend.dto.response.StudioResponseDTO;
import com.streamversex.backend.dto.response.VoiceActorResponseDTO;
import com.streamversex.backend.externalapi.anilist.dto.AniListDateDTO;
import com.streamversex.backend.externalapi.anilist.dto.AniListMediaDTO;

@Component
public class AnimeMapper {

    public AnimeResponseDTO toResponseDTO(
            AniListMediaDTO anime) {

        if (anime == null) {
            return null;
        }

        return AnimeResponseDTO.builder()
                .id(anime.getId())

                .title(
                        anime.getTitle() != null
                                ? anime.getTitle().getRomaji()
                                : null
                )

                .englishTitle(
                        anime.getTitle() != null
                                ? anime.getTitle().getEnglish()
                                : null
                )

                .description(anime.getDescription())

                .format(anime.getFormat())
                .status(anime.getStatus())

                .episodes(anime.getEpisodes())

                .averageScore(anime.getAverageScore())

                .popularity(anime.getPopularity())

                .genres(
                        anime.getGenres() != null
                                ? anime.getGenres()
                                : Collections.emptyList()
                )

                .coverImageUrl(
                        anime.getCoverImage() != null
                                ? anime.getCoverImage().getExtraLarge()
                                : null
                )

                .bannerImageUrl(anime.getBannerImage())

                .build();
    }
    
    
    public AnimeDetailsResponseDTO toDetailsResponseDTO(
            AniListMediaDTO anime) {

        if (anime == null) {
            return null;
        }

        List<StudioResponseDTO> studios =
                anime.getStudios() == null
                        || anime.getStudios().getNodes() == null
                        ? List.of()
                        : anime.getStudios()
                                .getNodes()
                                .stream()
                                .map(studio ->
                                        StudioResponseDTO.builder()
                                                .id(studio.getId())
                                                .name(studio.getName())
                                                .animationStudio(
                                                        studio.getIsAnimationStudio())
                                                .build()
                                )
                                .toList();

        AnimeTrailerResponseDTO trailer = null;

        if (anime.getTrailer() != null) {

            String videoUrl = buildTrailerUrl(
                    anime.getTrailer().getSite(),
                    anime.getTrailer().getId()
            );

            trailer = AnimeTrailerResponseDTO.builder()
                    .id(anime.getTrailer().getId())
                    .site(anime.getTrailer().getSite())
                    .thumbnailUrl(anime.getTrailer().getThumbnail())
                    .videoUrl(videoUrl)
                    .build();
        }

        return AnimeDetailsResponseDTO.builder()
                .id(anime.getId())

                .title(
                        anime.getTitle() != null
                                ? anime.getTitle().getRomaji()
                                : null)

                .englishTitle(
                        anime.getTitle() != null
                                ? anime.getTitle().getEnglish()
                                : null)

                .nativeTitle(
                        anime.getTitle() != null
                                ? anime.getTitle().getNativeTitle()
                                : null)

                .synonyms(
                        anime.getSynonyms() != null
                                ? anime.getSynonyms()
                                : List.of())

                .description(anime.getDescription())

                .format(anime.getFormat())
                .status(anime.getStatus())
                .source(anime.getSource())

                .episodes(anime.getEpisodes())
                .duration(anime.getDuration())

                .averageScore(anime.getAverageScore())
                .meanScore(anime.getMeanScore())
                .popularity(anime.getPopularity())
                .favourites(anime.getFavourites())

                .season(anime.getSeason())
                .seasonYear(anime.getSeasonYear())

                .countryOfOrigin(anime.getCountryOfOrigin())

                .genres(
                        anime.getGenres() != null
                                ? anime.getGenres()
                                : List.of())

                .startDate(formatDate(anime.getStartDate()))
                .endDate(formatDate(anime.getEndDate()))

                .coverImageUrl(
                        anime.getCoverImage() != null
                                ? anime.getCoverImage().getExtraLarge()
                                : null)

                .bannerImageUrl(anime.getBannerImage())
                .siteUrl(anime.getSiteUrl())

                .studios(studios)
                .trailer(trailer)

                .build();
    }
    
    
    public List<AnimeCharacterResponseDTO> toCharacterResponseDTOs(
            AniListMediaDTO anime) {

        if (anime == null
                || anime.getCharacters() == null
                || anime.getCharacters().getEdges() == null) {

            return List.of();
        }

        return anime.getCharacters()
                .getEdges()
                .stream()

                .filter(edge -> edge.getNode() != null)

                .map(edge -> {

                    List<VoiceActorResponseDTO> voiceActors =
                            edge.getVoiceActors() == null
                                    ? List.of()
                                    : edge.getVoiceActors()
                                            .stream()
                                            .map(actor ->
                                                    VoiceActorResponseDTO.builder()
                                                            .id(actor.getId())

                                                            .name(
                                                                    actor.getName() != null
                                                                            ? actor.getName().getFull()
                                                                            : null)

                                                            .nativeName(
                                                                    actor.getName() != null
                                                                            ? actor.getName().getNativeName()
                                                                            : null)

                                                            .language(
                                                                    actor.getLanguageV2())

                                                            .imageUrl(
                                                                    actor.getImage() != null
                                                                            ? actor.getImage().getLarge()
                                                                            : null)

                                                            .siteUrl(
                                                                    actor.getSiteUrl())

                                                            .build()
                                            )
                                            .toList();

                    return AnimeCharacterResponseDTO.builder()

                            .id(edge.getNode().getId())

                            .name(
                                    edge.getNode().getName() != null
                                            ? edge.getNode().getName().getFull()
                                            : null)

                            .nativeName(
                                    edge.getNode().getName() != null
                                            ? edge.getNode().getName().getNativeName()
                                            : null)

                            .role(edge.getRole())

                            .imageUrl(
                                    edge.getNode().getImage() != null
                                            ? edge.getNode().getImage().getLarge()
                                            : null)

                            .siteUrl(
                                    edge.getNode().getSiteUrl())

                            .voiceActors(voiceActors)

                            .build();
                })

                .toList();
    }
    
    
    public List<AnimeResponseDTO> toRecommendationResponseDTOs(
            AniListMediaDTO anime) {

        if (anime == null
                || anime.getRecommendations() == null
                || anime.getRecommendations().getNodes() == null) {

            return List.of();
        }

        return anime.getRecommendations()
                .getNodes()
                .stream()

                .filter(recommendation ->
                        recommendation.getMediaRecommendation() != null)

                .map(recommendation ->
                        toResponseDTO(
                                recommendation.getMediaRecommendation()))

                .toList();
    }
    
    
    private String formatDate(AniListDateDTO date) {

        if (date == null || date.getYear() == null) {
            return null;
        }

        StringBuilder result =
                new StringBuilder(date.getYear().toString());

        if (date.getMonth() != null) {
            result.append("-")
                    .append(String.format("%02d", date.getMonth()));
        }

        if (date.getDay() != null) {
            result.append("-")
                    .append(String.format("%02d", date.getDay()));
        }

        return result.toString();
    }

    private String buildTrailerUrl(String site, String id) {

        if (site == null || id == null || id.isBlank()) {
            return null;
        }

        if ("youtube".equalsIgnoreCase(site)) {
            return "https://www.youtube.com/watch?v=" + id;
        }

        if ("dailymotion".equalsIgnoreCase(site)) {
            return "https://www.dailymotion.com/video/" + id;
        }

        return null;
    }
}