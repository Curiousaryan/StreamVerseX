package com.streamversex.backend.mapper;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.streamversex.backend.dto.response.CastResponseDTO;
import com.streamversex.backend.dto.response.CrewResponseDTO;
import com.streamversex.backend.dto.response.NetworkResponseDTO;
import com.streamversex.backend.dto.response.SeasonResponseDTO;
import com.streamversex.backend.dto.response.TvCreditsResponseDTO;
import com.streamversex.backend.dto.response.TvDetailsResponseDTO;
import com.streamversex.backend.dto.response.TvResponseDTO;
import com.streamversex.backend.dto.response.VideoResponseDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbCreditsResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbTvDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbTvDetailsDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbVideoResponse;




@Component
public class TvMapper {

    private static final String IMAGE_BASE_URL =
            "https://image.tmdb.org/t/p/w500";

    private static final String BACKDROP_BASE_URL =
            "https://image.tmdb.org/t/p/original";

    public TvResponseDTO toResponseDTO(TmdbTvDTO tv) {

        return TvResponseDTO.builder()
                .id(tv.getId())
                .name(tv.getName())
                .overview(tv.getOverview())
                .posterUrl(buildPosterUrl(tv.getPosterPath()))
                .backdropUrl(buildBackdropUrl(tv.getBackdropPath()))
                .firstAirDate(tv.getFirstAirDate())
                .rating(tv.getVoteAverage())
                .voteCount(tv.getVoteCount())
                .genreIds(tv.getGenreIds())
                .build();
    }

    public TvDetailsResponseDTO toDetailsResponseDTO(
            TmdbTvDetailsDTO tv) {

        return TvDetailsResponseDTO.builder()
                .id(tv.getId())
                .name(tv.getName())
                .originalName(tv.getOriginalName())
                .overview(tv.getOverview())
                .tagline(tv.getTagline())
                .posterUrl(buildPosterUrl(tv.getPosterPath()))
                .backdropUrl(buildBackdropUrl(tv.getBackdropPath()))
                .firstAirDate(tv.getFirstAirDate())
                .lastAirDate(tv.getLastAirDate())
                .status(tv.getStatus())
                .numberOfSeasons(tv.getNumberOfSeasons())
                .numberOfEpisodes(tv.getNumberOfEpisodes())
                .episodeRunTime(tv.getEpisodeRunTime())
                .rating(tv.getVoteAverage())
                .voteCount(tv.getVoteCount())
                .originalLanguage(tv.getOriginalLanguage())
                .originCountry(tv.getOriginCountry())

                .genres(
                        tv.getGenres() == null
                                ? Collections.emptyList()
                                : tv.getGenres()
                                        .stream()
                                        .map(genre -> genre.getName())
                                        .toList()
                )

                .networks(
                        tv.getNetworks() == null
                                ? Collections.emptyList()
                                : tv.getNetworks()
                                        .stream()
                                        .map(network ->
                                                NetworkResponseDTO.builder()
                                                        .id(network.getId())
                                                        .name(network.getName())
                                                        .logoUrl(buildLogoUrl(
                                                                network.getLogoPath()))
                                                        .originCountry(
                                                                network.getOriginCountry())
                                                        .build()
                                        )
                                        .toList()
                )

                .seasons(
                        tv.getSeasons() == null
                                ? Collections.emptyList()
                                : tv.getSeasons()
                                        .stream()
                                        .map(season ->
                                                SeasonResponseDTO.builder()
                                                        .id(season.getId())
                                                        .name(season.getName())
                                                        .overview(season.getOverview())
                                                        .seasonNumber(
                                                                season.getSeasonNumber())
                                                        .episodeCount(
                                                                season.getEpisodeCount())
                                                        .airDate(season.getAirDate())
                                                        .posterUrl(buildPosterUrl(
                                                                season.getPosterPath()))
                                                        .rating(
                                                                season.getVoteAverage())
                                                        .build()
                                        )
                                        .toList()
                )

                .build();
    }
    
    
    public TvCreditsResponseDTO toCreditsResponseDTO(
            TmdbCreditsResponse credits) {

        if (credits == null) {
            return TvCreditsResponseDTO.builder()
                    .cast(List.of())
                    .crew(List.of())
                    .build();
        }

        List<CastResponseDTO> cast =
                credits.getCast() == null
                        ? List.of()
                        : credits.getCast()
                                .stream()
                                .sorted((a, b) -> Integer.compare(
                                        a.getOrder() != null
                                                ? a.getOrder()
                                                : Integer.MAX_VALUE,
                                        b.getOrder() != null
                                                ? b.getOrder()
                                                : Integer.MAX_VALUE
                                ))
                                .limit(20)
                                .map(person -> CastResponseDTO.builder()
                                        .id(person.getId())
                                        .name(person.getName())
                                        .character(person.getCharacter())
                                        .profileUrl(
                                                buildProfileUrl(
                                                        person.getProfilePath()))
                                        .build())
                                .toList();

        List<CrewResponseDTO> crew =
                credits.getCrew() == null
                        ? List.of()
                        : credits.getCrew()
                                .stream()
                                .filter(person ->
                                        "Director".equalsIgnoreCase(person.getJob())
                                        || "Producer".equalsIgnoreCase(person.getJob())
                                        || "Executive Producer".equalsIgnoreCase(person.getJob())
                                        || "Screenplay".equalsIgnoreCase(person.getJob())
                                        || "Writer".equalsIgnoreCase(person.getJob())
                                )
                                .map(person -> CrewResponseDTO.builder()
                                        .id(person.getId())
                                        .name(person.getName())
                                        .job(person.getJob())
                                        .department(person.getDepartment())
                                        .profileUrl(
                                                buildProfileUrl(
                                                        person.getProfilePath()))
                                        .build())
                                .toList();

        return TvCreditsResponseDTO.builder()
                .tvId(credits.getId())
                .cast(cast)
                .crew(crew)
                .build();
    }
    
    
    public List<VideoResponseDTO> toVideoResponseDTOs(
            TmdbVideoResponse response) {

        if (response == null || response.getResults() == null) {
            return List.of();
        }

        return response.getResults()
                .stream()

                // Only YouTube videos
                .filter(video ->
                        "YouTube".equalsIgnoreCase(video.getSite()))

                // Only trailers and teasers
                .filter(video ->
                        "Trailer".equalsIgnoreCase(video.getType())
                        || "Teaser".equalsIgnoreCase(video.getType()))

                // Official videos first
                .sorted((a, b) ->
                        Boolean.compare(
                                Boolean.TRUE.equals(b.getOfficial()),
                                Boolean.TRUE.equals(a.getOfficial())
                        ))

                .map(video -> VideoResponseDTO.builder()
                        .id(video.getId())
                        .name(video.getName())
                        .key(video.getKey())
                        .site(video.getSite())
                        .type(video.getType())
                        .official(video.getOfficial())
                        .videoUrl(buildYouTubeUrl(video.getKey()))
                        .build())

                .toList();
    }
    
    private String buildPosterUrl(String path) {

        if (path == null || path.isBlank()) {
            return null;
        }

        return IMAGE_BASE_URL + path;
    }

    private String buildBackdropUrl(String path) {

        if (path == null || path.isBlank()) {
            return null;
        }

        return BACKDROP_BASE_URL + path;
    }
    
    private String buildLogoUrl(String path) {

        if (path == null || path.isBlank()) {
            return null;
        }

        return IMAGE_BASE_URL + path;
    }
    
    private String buildProfileUrl(String path) {

        if (path == null || path.isBlank()) {
            return null;
        }

        return IMAGE_BASE_URL + path;
    }
    
    private String buildYouTubeUrl(String key) {

        if (key == null || key.isBlank()) {
            return null;
        }

        return "https://www.youtube.com/watch?v=" + key;
    }
}